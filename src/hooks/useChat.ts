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


export const useChat = (userId: string,roomId:string) => {
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

        const handleLoadMessages=async()=>{
            await loadMessages(roomId);
        }
        handleLoadMessages();

        return () => {
        socket.disconnect();
        };//!receive message is not working
    }, [userId]);

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
    },[roomId]);


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

    const sendMessage = async(message: string) => {
        if (!message.trim()) return;

        // const data = {
        // roomId: currentRoom,
        // message,
        // senderId: userId,
        // };

        await ChatService.sendMessage(roomId,message);
        await loadMessages(roomId);//roomId
    };

    return {
        messages,
        joinRoom,
        sendMessage,
        currentRoom,
    };
};
