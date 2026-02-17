import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "@/hooks/useAppContext";

const SocketProvider = ({ children }) => {

    const user = { id: "78hsKi67", role: "Admin" };

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!user?.id) return;

        const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
        auth: {
            userId: user.id,
            role: user.role,
        },
        });

        newSocket.on("connect", () => {
        console.log("Socket CONNECTED:", newSocket.id);
        });

        newSocket.on("disconnect", (reason) => {
        console.log("Socket DISCONNECTED:", reason);
        });

        setSocket(newSocket);

        return () => {
        newSocket.disconnect();
        };

    }, [user?.id]);

    return (
        <SocketContext.Provider value={socket}>
        {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
