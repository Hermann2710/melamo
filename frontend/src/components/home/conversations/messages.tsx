import { RootState } from "@/store";
import { AlertCircle, Loader } from "lucide-react";
import { useSelector } from "react-redux";
import MessageCard from "./message";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Message from "@/types/Message";
import useListenMessages from "@/hooks/useListenMessages";

type Props = {
  setMessage: Dispatch<SetStateAction<Message | null>>;
  receiverId: string;
};

function ConversationMessages({ setMessage, receiverId }: Props) {
  useListenMessages();
  const { isLoading, conversation } = useSelector(
    (state: RootState) => state.conversationReducer
  );
  const { user } = useSelector((state: RootState) => state.authReducer);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="font-semibold text-lg text-gray-700 flex items-center gap-2">
          Please select a conversation <AlertCircle className="text-red-500" />
        </h1>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full flex justify-center items-center">
        {isLoading ? (
          <div className="flex gap-3">
            Loading messages...&nbsp;
            <Loader className="animate-spin" size={32} color="blue" />
          </div>
        ) : (
          <div className="w-full h-full overflow-y-auto flex flex-col">
            {conversation.messages.length <= 0 ? (
              <div className="flex flex-1 justify-center items-center">
                <h1 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                  No messages yet <AlertCircle className="text-green-500" />
                </h1>
              </div>
            ) : (
              conversation.messages.map((message) => (
                <MessageCard
                  key={message._id}
                  message={message}
                  setMessage={setMessage}
                  receiverId={receiverId}
                  isSender={message.sender === user?._id}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    );
  }
}

export default ConversationMessages;