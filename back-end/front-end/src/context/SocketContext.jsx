import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProviderContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

// it is a hook
export const useSoketHook = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth()
  console.log(authUser);  
  useEffect(() => {
    // console.log(authUser);
    if (authUser) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: authUser.user._id,
        },
      });

      console.log("22", socket);
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        console.log(users);
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
