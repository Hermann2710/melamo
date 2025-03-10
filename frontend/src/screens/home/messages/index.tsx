import MessageForm from "@/components/home/conversations/MessageForm";
import ConversationMessages from "@/components/home/conversations/ConversationMessages";
import ConversationsList from "@/components/home/conversations/ConversationsList";
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
    if (user && username && username !== user.username) {
      const selectedUser = users.find((u) => u.username === username);
      if (selectedUser) {
        setReceiverId(selectedUser._id);
      }
    } else {
      setReceiverId("");
    }
  }, [username, user, users]);

  useEffect(() => {
    if (receiverId && user) {
      dispatch(fetchMessages({ senderId: user._id, receiverId: receiverId }));
    } else {
      dispatch(resetConversation());
    }
  }, [receiverId, user, dispatch]);

  useEffect(() => {
    if (message) {
      setText(message.text);
    } else {
      setText("");
    }
  }, [message]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && receiverId) {
      const action = message
        ? editMessage({ messageId: message._id, text, receiverId })
        : sendMessage({ receiverId, senderId: user._id, text });

      dispatch(action).unwrap().then((payload) => {
        if (payload.success) {
          setText("");
          setMessage(null);
          toast.success(payload.message, { closeButton: true });
        } else {
          toast.error(payload.message, { closeButton: true });
        }
      }).catch((error) => {
        toast.error(error.message || "An error occurred", { closeButton: true });
      });
    } else {
      toast.error("Please select a conversation", { closeButton: true });
    }
  };

  const toggleEdit = () => !!message?._id;

  if (!user) {
    return <h1 className="text-2xl font-bold text-center mb-4">You are not allowed</h1>;
  }

  if (user.username === username) {
    return <h1 className="text-2xl font-bold text-center mb-4">You cannot be the receiver</h1>;
  }

  return (
    <div className="my-4">
      <div className="flex flex-col sm:flex-row gap-5">
        <ConversationsList />
        <div className="w-full sm:w-9/12 bg-white shadow-md rounded-lg p-4 h-[580px] flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold">
              {users.find((u) => u._id === receiverId)?.username}
            </h2>
            <ConversationMessages setMessage={setMessage} receiverId={receiverId} />
          </div>
          {receiverId && (
            <div className="mt-4">
              <MessageForm
                message={text}
                setMessage={setText}
                isEditMode={toggleEdit()}
                handleSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeMessages;