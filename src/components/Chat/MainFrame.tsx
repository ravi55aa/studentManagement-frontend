import { useEffect, useState } from "react";
import { useChat } from "@/hooks/useChat"; 
import {ChatHeader,ChatInput,ChatMessages,ChatSidebar} from "./index";
import { ChatService } from "@/api/Services/other/chat.service";
import { toast } from "react-toastify";

const ChatPage = ({ userId, role }: Record<string,string>) => {
    const [activeTab, setActiveTab] = useState("direct");

    useEffect(()=>{
        console.log('The active tab is ',activeTab);
        const switchTab=async()=>{
            const user2='69a7be8389eb375748ed3b91'; //'hardCodeValue'
            if(activeTab=='direct'){
                //call direct activeTab api call;
                
                const res=await ChatService.createDirectChat(role,userId,user2);

                if(!res.success){
                    toast.info(res.error.message);
                    return res.success;
                }

            } else {
                await ChatService.createDirectChat(role,userId,user2);
                //call other center or batch tabs;
            }
        }
        switchTab();
    },[activeTab]);

    const { messages, joinRoom, sendMessage } = useChat(userId);

    const rooms = [
        { id: "Student-69b174a03bf2747aa6e99173", name: "Room 1" },
        { id: "room2", name: "Room 2" },
    ];

    const handleRoomSelect = (roomId: string) => {
        joinRoom(roomId);
    };

    return (
        <div className="h-screen flex bg-gray-50">

        <ChatSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            rooms={rooms}
            onSelectRoom={handleRoomSelect}
        />

        <div className="flex-1 flex flex-col">
            <ChatHeader title={activeTab.toUpperCase()} />

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