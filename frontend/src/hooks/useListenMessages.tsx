import useSocketContext from "@/contexts/SocketContext";
import { AppDispatch } from "@/store";
import { addMessage, removeMessage, updateMessage } from "@/store/conversations";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useListenMessages() {
  const { socket } = useSocketContext();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        dispatch(addMessage({ message: message }));
      });
      socket.on("updateMessage", (message) => {
        dispatch(updateMessage({ message: message }));
      });
      socket.on("deleteMessage", (message) => {
        dispatch(removeMessage({ message: message }));
      });

      return () => {
        socket.off("newMessage");
        socket.off("updateMessage");
        socket.off("deleteMessage");
      };
    }
  }, [socket]);
}

export default useListenMessages;
