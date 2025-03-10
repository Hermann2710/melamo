import { RootState } from "@/store";
import { AlertCircle, HandIcon, Loader } from "lucide-react";
import { useSelector } from "react-redux";
import MessageCard from "./message";
import { Dispatch, SetStateAction } from "react";
import Message from "@/types/Message";

function ConversationMessages({
  setMessage,
}: {
  setMessage: Dispatch<SetStateAction<Message | null>>;
}) {
  const { isLoading, conversation } = useSelector(
    (state: RootState) => state.conversationReducer
  );

  if (!conversation) {
    return (
      <h1 className="font-semibold flex justify-center items-center gap-2 w-full">
        Please select a conversation <AlertCircle color="red" />
      </h1>
    );
  } else {
    return (
      <div className="flex flex-col w-full">
        {isLoading ? (
          <>
            <h1 className="text-xl font-semibold flex justify-center gap-2 items-center">
              Loading messages <Loader className="animate-spin" />
            </h1>
          </>
        ) : (
          <>
            {conversation.messages.length === 0 ? (
              <h1 className="flex h-full justify-center items-center gap-2 font-semibold">
                No message. Send first <HandIcon color="yellow" />
              </h1>
            ) : (
              conversation.messages.map((message) => (
                <MessageCard
                  key={message._id}
                  message={message}
                  setMessage={setMessage}
                />
              ))
            )}
          </>
        )}
      </div>
    );
  }
}

export default ConversationMessages;
