import AvatarLink from "@/components/common/avatarLink";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { AppDispatch, RootState } from "@/store";
import { deleteMessage } from "@/store/conversations";
import Message from "@/types/Message";
import User from "@/types/User";
import { CheckCheck, Edit2, Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

type Props = {
  message: Message;
  setMessage: Dispatch<SetStateAction<Message | null>>;
  receiverId: string;
  isSender: boolean;
};

function MessageCard({ message, setMessage, receiverId, isSender }: Props) {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const { users } = useSelector((state: RootState) => state.usersReducer);
  const dispatch = useDispatch<AppDispatch>();

  const findUser = () => {
    let user: User | null = null;
    users.map((u) => {
      if (u._id === message.sender) {
        user = u;
      }
    });
    return user!;
  };

  const handleDelete = () => {
    dispatch(
      deleteMessage({ messageId: message._id, receiverId: receiverId })
    ).then((action) => {
      if (action.payload.success) {
        return toast.success(action.payload.message, { closeButton: true });
      } else {
        return toast.error(action.payload.message, { closeButton: true });
      }
    });
  };

  const handleEdit = () => {
    setMessage(message);
  };

  if (!user) {
    return <h1>You are not authorized</h1>;
  } else {
    return (
      <div
        className={`w-fit p-4 my-2 border rounded-lg shadow-md ${
          isSender ? "self-end bg-blue-100" : "self-start bg-gray-100"
        }`}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex items-center gap-2">
              <AvatarLink
                username={findUser().username}
                avatar={findUser().avatar}
              />
              <div>
                <p className="text-xs flex justify-between gap-2 text-gray-500">
                  <span>
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </span>
                  <span className="italic">
                    {message.createdAt !== message.updatedAt && "Edited"}
                  </span>
                </p>
                <p className="flex items-center text-gray-700">
                  {message.text}&nbsp;
                  <CheckCheck size={12} className="text-green-500" />
                </p>
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuGroup>
              <ContextMenuItem
                onClick={handleEdit}
                className="flex justify-between"
              >
                <span>Edit</span>
                <Edit2 size={12} />
              </ContextMenuItem>
              <ContextMenuItem
                className="flex justify-between"
                onClick={handleDelete}
              >
                <span>Delete</span>
                <Trash size={12} />
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );
  }
}

export default MessageCard;