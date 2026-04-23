import { useEffect, useState } from "react";
import { useChat } from "@/hooks/useChat"; 
import {ChatHeader,ChatInput,ChatMessages,ChatSidebar} from "./index";
import { ChatService } from "@/api/Services/other/chat.service";
import { ITeacherBio } from "@/interfaces/ITeacher";
import { TeacherService } from "@/api/Services/teacher.service";
import { Roles } from "@/constants/role.enum";
import { StudentService } from "@/api/Services/Student/student.service";
import { IStudent } from "@/interfaces/IStudent";
import { BatchService } from "@/api/Services/batch.service";
import { paginationQuery } from "@/constants/pagination";

const ChatPage = ({ userId, role }: Record<string,string>) => {
    const [activeTab, setActiveTab] = useState("direct");
    const [roomId, setRoomId] = useState<string>();
    const [directChatWith, setDirectChatWith] = useState<ITeacherBio|IStudent|null>(null);

    useEffect(()=>{

        const switchTab=async()=>{
            
            if (activeTab=='direct') { //call direct activeTab api call;
                
                let user2Id='something';

                if(role==Roles.Student){
                    const resTeacher=await TeacherService.getById(directChatWith?._id);

                    const {teacher}=resTeacher.data?.data;

                    user2Id=teacher?.teacherId;

                } else {
                    
                    //role==teacher; then figure out the studentId
                    const res=await StudentService.getById(directChatWith?._id);

                    const student=res.data?.data;
                    
                    user2Id=student?._id;
                }

                const res=await ChatService.createDirectChat(userId,user2Id);

                if(!res.success){
                    //toast.info(res.error.message);

                    return res.success;
                }
                
                const room=res.data.data;
                
                setRoomId(room._id)//room id;
            } else if(activeTab =='batch') {

                await handleCreateBatchChat();
            }
        }
        switchTab();
    },[activeTab,directChatWith]);

    async function handleCreateBatchChat () {
        let batchId:string='batchId';

        if(role==Roles.Teacher){
            const resTeacher=await TeacherService.getById(userId);

            const {teacher}=resTeacher.data.data;
            const teacherId=teacher.teacherId;
            
            const res=await BatchService.getAllWithQuery({batchCounselor:teacherId},paginationQuery);

            console.log('@MainFrame res',res);

            if(!res.success){
                //toast.error(res.error.message);
                return res.success;
            }

            //Here we are assuming that a teacher can only have one batch, if there are multiple batches then we need to handle that case as well.

            const resData=res.data.data;

            if( resData?.data && resData?.data?.length==0){
                //toast.info('No batch found for this teacher');
                return false;
            }

            const batch=resData?.data[0];
            
            setDirectChatWith((prev)=>({...prev,firstName:batch.name}));
            //batch name and id;

            batchId=batch._id; //update with teacher batchId;
            
        } else {
            //role==Student; then get the student batch
            const res=await StudentService.getById(userId);
            
            if(!res.success){
                //toast.warn(res.error.message);
                return res.success;
            }

            const student=res.data.data;
            
            batchId=student.batch;
        }

        //create batch chat
        const res= await ChatService.createBatchChat(batchId);

        if(!res.success){
            //toast.info(res.error.message);

            return res.success;
        }

        const room=res.data.data;
        
        setRoomId(room._id)//room id;
    }

    const { messages, sendMessage } = useChat(userId,roomId);

    const rooms = [ //?remove this when
        { id: "Student-69b174a03bf2747aa6e99173", name: "Room 1" },
        { id: "room2", name: "Room 2" },
    ];

    const handleOnStartDirectChat=(teacher:ITeacherBio|IStudent|null)=>{
        setDirectChatWith(teacher);
        return true;
    }

    return (
        <div className="h-screen flex bg-gray-50">

        <ChatSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onStartDirectChat={handleOnStartDirectChat}
            rooms={rooms}
            />

        <div className="flex-1 flex flex-col">
            <ChatHeader 
                name={directChatWith?.firstName || directChatWith?.name} 
                title={activeTab.toUpperCase()} 
                />

            <ChatMessages 
                messages={messages} 
                userId={userId} 
                />

            {/* Center restriction */}
            <ChatInput
                onSend={sendMessage}
                disabled={activeTab === "center" && role === "Student"}
                />

        </div>
        </div>
    );
};

export default ChatPage;