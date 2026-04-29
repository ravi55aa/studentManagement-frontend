/*BACKEND SETUP
---------------- 
Backend Setup[controller service repo]
socket connect 
*/

import { useEffect, useState } from "react";
import { useSocket } from "./useAppContext";
import { SocketMessages } from "@/constants/messages";
import { ChatService } from "@/api/Services/other/chat.service";
import { toast } from "react-toastify";
import { useAppSelector } from "./useStoreHooks";
import { IMessage } from "@/interfaces/IChat";

export const useChat = (userId: string,roomId:string) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [currentRoom, setCurrentRoom] = useState<string>("");
    const socket=useSocket();

    const {user}=useAppSelector((state)=>state.currentUser);

    useEffect(() => {
        if(!socket?.id) {
            console.log(SocketMessages.SocketNotConnected);
            return;
        }

        console.log('socket.id',socket.id);

        socket.on("receiveMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        const handleLoadMessages=async()=>{
            await loadMessages(roomId); 
        }
        handleLoadMessages();

        return () => {
        socket.disconnect();
        };//!receive message is not working
    }, [socket?.id]);

    useEffect(()=>{

        if(!socket){  
            return;
        }

        const fetchMessages=async()=>{ //setCurrentRoom
            socket.emit("joinRoom", roomId);
            setCurrentRoom(roomId);
            setMessages([]);
    
            await loadMessages(roomId);//roomId
        }
        fetchMessages();
    },[roomId,socket?.id]);


    async function loadMessages(roomId: string) {
        const res = await ChatService.getMessages(roomId);
        
        if(!res.success){
            toast.warn(res.error.message);
            return res.success;
        }
        const messages=res.data.data.reverse();

        setMessages(messages);
    };

    const joinRoom = async(RoomId: string=roomId)  => {
        console.log('hi',RoomId);
    };

    const sendMessage = async(message: FormData) => {
        if (!message.get("message") && !message.get("docs")) return;

        // const data = {
        // roomId: currentRoom,
        // message,
        // senderId: userId,
        // };
        socket.emit("sendMessage", {chatRoomId: currentRoom, message: message.get("message")});


        message.append("chatRoomId", roomId);
        await ChatService.sendMessage(message);
        await loadMessages(roomId);//roomId
    };

    return {
        messages,
        joinRoom,
        sendMessage,
        currentRoom,
    };
};
