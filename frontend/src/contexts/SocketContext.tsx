import { RootState } from "@/store";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext({
  socket: null,
  onlineUsers: [],
} as { socket: Socket | null; onlineUsers: string[] });

export const SocketContextProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: user._id,
        },
      });
      setSocket(socket);

      // socket.on() is used to listen to the events.
      // Can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default function useSocketContext() {
  return useContext(SocketContext);
}
