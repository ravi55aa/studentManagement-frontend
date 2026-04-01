import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketContext } from '@/hooks/useAppContext';
import { useAppSelector } from '@/hooks/useStoreHooks';

const SocketProvider = ({ children }) => {
  const {user}=useAppSelector((state)=>state.currentUser);
  //const user = { id: '78hsKi67', role: 'Admin' };

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    (() => {
      if (!user?.id) return;

      //!Later update the production url
      const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
        auth: {
          userId: user.id,
          role: user.role,
        },
        withCredentials:true
      });

      newSocket.on('connect', () => {
        console.log('Socket CONNECTED:', newSocket.id);
      });

      newSocket.on("connect_error", (err) => {
        console.log("Socket error:", err.message);
      });

      newSocket.on('disconnect', (reason) => {
        console.log('Socket DISCONNECTED:', reason);
      });

      setSocket(newSocket);
      
      //clean up when component unmounts
      return ()=>{
        newSocket.disconnect();
      }
    })();

    return () => {};
  }, [user?.id, user?.role]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
