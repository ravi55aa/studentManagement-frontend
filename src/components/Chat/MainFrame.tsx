import { useEffect, useState } from "react";
import { useChat } from "@/hooks/useChat"; 
import {ChatHeader,ChatInput,ChatMessages,ChatSidebar} from "./index";
import { ChatService } from "@/api/Services/other/chat.service";
import { toast } from "react-toastify";
import { ITeacherBio } from "@/interfaces/ITeacher";
import { TeacherService } from "@/api/Services/teacher.service";
import { Roles } from "@/constants/role.enum";

const ChatPage = ({ userId, role }: Record<string,string>) => {
    const [activeTab, setActiveTab] = useState("direct");
    const [roomId, setRoomId] = useState<string>();
    const [directChatWith, setDirectChatWith] = useState<ITeacherBio|null>(null);

    useEffect(()=>{
        const switchTab=async()=>{
            const user22='something'; //'teacherId'
            if(activeTab=='direct'){
                //call direct activeTab api call;


                console.log('@mainFrame directChatwith',directChatWith)
                const resTeacher=await TeacherService.get(Roles.Student,directChatWith?._id);
                const {teacher}=resTeacher.data.data;

                const res=await ChatService.createDirectChat(role,userId,teacher.teacherId);

                if(!res.success){
                    toast.info(res.error.message);
                    return res.success;
                }

                const room=res.data.data;
                setRoomId(room._id)//room id;

            } else {
                await ChatService.createDirectChat(role,userId,user22);
                //call other center or batch tabs;
            }
        }
        switchTab();
    },[activeTab,directChatWith]);

    const { messages, sendMessage } = useChat(userId,roomId);

    const rooms = [ //?remove this when
        { id: "Student-69b174a03bf2747aa6e99173", name: "Room 1" },
        { id: "room2", name: "Room 2" },
    ];

    const handleOnStartDirectChat=(teacher:ITeacherBio)=>{
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
            <ChatHeader directChatWith={directChatWith} title={activeTab.toUpperCase()} />

            <ChatMessages messages={messages} userId={userId} />

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