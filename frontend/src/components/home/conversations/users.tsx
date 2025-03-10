import AvatarLink from "@/components/common/avatarLink";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/store";
import { fetchMessages } from "@/store/conversations";
import User from "@/types/User";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function ConversationsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.authReducer);
  const { users } = useSelector((state: RootState) => state.usersReducer);
  const [receiverId, setReceiverId] = useState<string>("");
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    if (user) {
      if (receiverId) {
        dispatch(
          fetchMessages({ senderId: user?._id, receiverId: receiverId })
        );
      }
    }
  }, [receiverId]);

  const handleSelectConversation = (user: User) => {
    setReceiverId(user._id);
    navigate(`/messages/${user.username}`);
  };

  if (!user) {
    return (
      <h1 className="text-2xl font-bold text-center">You are not allowed</h1>
    );
  } else {
    return (
      <div className="w-full sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12">
        <h1 className="text-2xl font-black mb-3">Discussions</h1>
        <div className="w-full flex flex-col gap-3">
          {users.map((u) => {
            if (u._id === user._id) {
              return null;
            } else {
              return (
                <Button
                  onClick={() => handleSelectConversation(u)}
                  variant={u.username === username ? "secondary" : "ghost"}
                  className="w-full flex gap-2 py-6"
                  key={u._id}
                >
                  <AvatarLink username={u.username} avatar={u.avatar} />
                  <div className="flex-1 text-start">{u.username}</div>
                </Button>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default ConversationsList;
