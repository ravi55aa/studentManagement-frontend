/*BACKEND SETUP
---------------- 
Backend Setup[controller service repo]
socket connect 
*/

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "./useAppContext";
import { SocketMessages } from "@/constants/messages";
import { ChatService } from "@/api/Services/other/chat.service";
import { Roles } from "@/constants/role.enum";
import { toast } from "react-toastify";
import { useAppSelector } from "./useStoreHooks";


export const useChat = (userId: string) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [currentRoom, setCurrentRoom] = useState<string>("");
    const socket=useSocket();
    const {user}=useAppSelector((state)=>state.currentUser);

    useEffect(() => {
        if(!socket?.id) {
            console.log(SocketMessages.SocketNotConnected);
            return;
        }

        socket.on("receiveMessage", (data) => {
        setMessages((prev) => [...prev, data]);
        });

        return () => {
        socket.disconnect();
        };
    }, [userId]);


    const loadMessages = async (roomId: string) => {
    const res = await ChatService.getMessages(user.role,roomId);
    
    if(!res.success){
        toast.warn(res.error.message);
        return res.success;
    }

    const messages=res.data.data.reverse();

    setMessages(messages);
    };

    const joinRoom = async(roomId: string)  => {
        socket.emit("joinRoom", roomId);
        setCurrentRoom(roomId);
        setMessages([]);

        await loadMessages('69ccdf7183f2647087607827');//roomId
    };

    const sendMessage = async(message: string) => {
        if (!message.trim()) return;

        const data = {
        roomId: currentRoom,
        message,
        senderId: userId,
        };
        

        await ChatService.sendMessage(user.role,'69ccdf7183f2647087607827',message)
        await loadMessages('69ccdf7183f2647087607827');
    };

    return {
        messages,
        joinRoom,
        sendMessage,
        currentRoom,
    };
};