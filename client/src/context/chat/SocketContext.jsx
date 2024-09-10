import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const socketContext = createContext();

// Custom hook to use socket context
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      const newSocket = io("http://localhost:5000", {
        query: { userId },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Cleanup on unmount or when userId changes
      return () => {
        newSocket.off("getOnlineUsers");
        newSocket.close();
        setSocket(null); // Ensure socket is cleared on cleanup
      };
    }
  }, []); // Removed `socket` from dependency array

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
