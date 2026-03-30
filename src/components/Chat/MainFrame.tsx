import { useState } from "react";
import { useChat } from "@/hooks/useChat"; 
import {ChatHeader,ChatInput,ChatMessages,ChatSidebar} from "./index";

const ChatPage = ({ userId, role }: Record<string,string>) => {
    const [activeTab, setActiveTab] = useState("direct");

    const { messages, joinRoom, sendMessage } = useChat(userId);

    const rooms = [
        { id: "room1", name: "Room 1" },
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
            disabled={activeTab === "center" && role === "student"}
            />
        </div>
        </div>
    );
};

export default ChatPage;