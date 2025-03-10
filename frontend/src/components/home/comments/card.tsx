import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Comment from "@/types/Comment";
import User from "@/types/User";
import { Edit, Trash } from "lucide-react";
import DeleteComment from "./delete";
import { Dispatch, SetStateAction, useState } from "react";
import AvatarLink from "@/components/common/avatarLink";

type Props = {
  comment: Comment;
  user: User;
  setComment: Dispatch<SetStateAction<Comment>>;
};

function CommentCard({ comment, user, setComment }: Props) {
  const side = user ? user._id !== comment.author._id : true;
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = () => {
    setOpen(!open);
  };

  const handleEditComment = () => {
    setComment({
      _id: comment._id,
      message: comment.message,
      author: comment.author._id,
      post: comment.post._id,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    });
  };

  return (
    <div
      className={`max-w-fit w-full border p-2 rounded ${
        side ? "self-start" : "self-end"
      }`}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="sm:flex gap-2">
            <AvatarLink
              username={comment.author.username}
              avatar={comment.author.avatar}
            />
            <div>
              <p className="text-[9px]">
                Added by{" "}
                <span className="font-semibold">
                  {user
                    ? user._id === comment.author._id
                      ? "me"
                      : comment.author.username
                    : comment.author.username}
                </span>
                &nbsp;on {new Date(comment.createdAt).toLocaleString()}
              </p>
              <div>{comment.message}</div>
              {comment.createdAt !== comment.updatedAt && (
                <p className="text-[9px] italic">
                  Edited on {new Date(comment.updatedAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </ContextMenuTrigger>
        {!user ? null : comment.author._id === user._id ? (
          <ContextMenuContent>
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuGroup className="flex gap-1">
              <ContextMenuItem onClick={handleEditComment}>
                <Button variant="outline">
                  <Edit />
                </Button>
              </ContextMenuItem>
              <ContextMenuItem onClick={handleDelete}>
                <Button variant="destructive">
                  <Trash />
                </Button>
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        ) : null}
      </ContextMenu>
      <DeleteComment comment={comment} open={open} setOpen={setOpen} />
    </div>
  );
}

export default CommentCard;
