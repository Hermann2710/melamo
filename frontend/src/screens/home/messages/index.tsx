import MessageForm from "@/components/home/conversations/form";
import ConversationMessages from "@/components/home/conversations/messages";
import ConversationsList from "@/components/home/conversations/users";
import { AppDispatch, RootState } from "@/store";
import {
  editMessage,
  fetchMessages,
  resetConversation,
  sendMessage,
} from "@/store/conversations";
import Message from "@/types/Message";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function HomeMessages() {
  const { username } = useParams();
  const { user } = useSelector((state: RootState) => state.authReducer);
  const { users } = useSelector((state: RootState) => state.usersReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState<string>("");
  const [message, setMessage] = useState<Message | null>(null);

  const [receiverId, setReceiverId] = useState<string>("");

  useEffect(() => {
    if (user) {
      if (username) {
        if (username !== user.username) {
          users.map((u) => {
            if (u.username === username) {
              setReceiverId(u._id);
              return;
            }
          });
        }
      } else {
        setReceiverId("");
      }
    }
  }, [username]);

  useEffect(() => {
    if (receiverId && user) {
      dispatch(fetchMessages({ senderId: user._id, receiverId: receiverId }));
    } else {
      dispatch(resetConversation());
    }
  }, [receiverId]);

  useEffect(() => {
    if (message) {
      setText(message.text);
    } else {
      setText("");
    }
  }, [message]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      if (receiverId) {
        if (message) {
          dispatch(
            editMessage({
              messageId: message._id,
              text: text,
            })
          ).then((action) => {
            if (action.payload.success) {
              setText("");
              setMessage(null);
              toast.success(action.payload.message, { closeButton: true });
            } else {
              toast.error(action.payload.message, { closeButton: true });
            }
          });
        } else {
          dispatch(
            sendMessage({
              receiverId: receiverId,
              senderId: user._id,
              text: text,
            })
          ).then((action) => {
            if (action.payload.success) {
              setText("");
              toast.success(action.payload.message, { closeButton: true });
            } else {
              toast.error(action.payload.message, { closeButton: true });
            }
          });
        }
      } else {
        toast.error("Please select a conversation", { closeButton: true });
      }
    } else {
      toast.error("You must be authenticated", { closeButton: true });
    }
  };

  if (!user) {
    return (
      <h1 className="text-2xl font-bold text-center mb-4">
        You are not allowed
      </h1>
    );
  } else {
    if (user.username === username) {
      return (
        <h1 className="text-2xl font-bold text-center mb-4">
          You cannot be the receiver
        </h1>
      );
    } else {
      return (
        <div className="mb-4">
          <h1 className="font-semibold text-3xl my-4">Conversations</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <ConversationsList />
            <div className="flex flex-col flex-1">
              <ConversationMessages setMessage={setMessage} />
              <MessageForm
                handleSubmit={handleSubmit}
                setMessage={setText}
                message={text}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default HomeMessages;
