/*BACKEND SETUP
---------------- 
Backend Setup[controller service repo]
socket connect 
*/

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "./useAppContext";
import { SocketMessages } from "@/constants/messages";

let socket: Socket;

export const useChat = (userId: string) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [currentRoom, setCurrentRoom] = useState<string>("");
    const socket=useSocket();

    useEffect(() => {
        if(!socket.id) {
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

    const joinRoom = (roomId: string) => {
        socket.emit("joinRoom", roomId);
        setCurrentRoom(roomId);
        setMessages([]);
    };

    const sendMessage = (message: string) => {
        if (!message.trim()) return;

        const data = {
        roomId: currentRoom,
        message,
        senderId: userId,
        };

        socket.emit("sendMessage", data);
    };

    return {
        messages,
        joinRoom,
        sendMessage,
        currentRoom,
    };
};