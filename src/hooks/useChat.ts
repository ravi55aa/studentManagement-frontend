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

        if (!socket?.id) return;

        socket.off("receiveMessage");

        socket.on("receiveMessage", (data) => {

            setMessages((prev) => {

                const exists = prev.some(
                    (msg) => msg?._id === data?._id
                );

                if (exists) return prev;

                return [...prev, data];
            });
        });

        return () => {
            socket.off("receiveMessage");
        };

    }, [socket?.id]);

    useEffect(()=>{

        if(!socket || !roomId){  
            return;
        }

        socket.emit("joinRoom", roomId);
        
        setCurrentRoom(roomId);
        
        // setMessages([]);

        loadMessages(roomId);//roomId

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

        //@data  
        /* 
        const data = {
                roomId: currentRoom,
                message,
                senderId: userId,
        };
        */

        message.append("chatRoomId", roomId);

        const res=await ChatService.sendMessage(message);

        if(!res.success){
            console.log('ChatService sendMessage error',res.error)
            return res.success;
        }
        
        return res.success;
        
    };

    return {
        messages,
        joinRoom,
        sendMessage,
        currentRoom,
    };
};
