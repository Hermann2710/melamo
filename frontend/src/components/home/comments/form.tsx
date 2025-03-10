import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../ui/button";
import { AppDispatch, RootState } from "@/store";
import Comment from "@/types/Comment";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
} from "react";
import Post from "@/types/Post";
import { toast } from "sonner";
import { addComment, editComment, fetchComments } from "@/store/comments";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  post: Post;
  comment: Comment;
  setComment: Dispatch<SetStateAction<Comment>>;
};

function CommentForm({ post, comment, setComment }: Props) {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment((prev) => ({
      ...prev,
      message: e.target.value,
    }));
  };

  const handleComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?._id) {
      return toast("You are not authenticated", {
        closeButton: true,
      });
    } else {
      if (!comment.message) {
        return toast.error("The comment cannot be empty", {
          closeButton: true,
        });
      } else {
        if (comment._id) {
          dispatch(editComment({ id: comment._id, comment: comment })).then(
            (action) => {
              if (!action.payload.success) {
                return toast.error(action.payload.message, {
                  closeButton: true,
                });
              } else {
                setComment((prev) => ({
                  ...prev,
                  _id: "",
                  message: "",
                  createdAt: "",
                  updatedAt: "",
                }));
                toast.success(action.payload.message, { closeButton: true });
                dispatch(fetchComments({ post: post._id })).then((action) => {
                  if (!action.payload.success) {
                    return toast(action.payload.message, { closeButton: true });
                  }
                });
              }
            }
          );
        } else {
          dispatch(addComment(comment)).then((action) => {
            if (!action.payload.success) {
              return toast.error(action.payload.message, { closeButton: true });
            } else {
              setComment((prev) => ({
                ...prev,
                _id: "",
                message: "",
                createdAt: "",
                updatedAt: "",
              }));
              toast.success(action.payload.message, { closeButton: true });
              dispatch(fetchComments({ post: post._id })).then((action) => {
                if (!action.payload.success) {
                  return toast(action.payload.message, { closeButton: true });
                }
              });
            }
          });
        }
      }
    }
  };

  useEffect(() => {
    setComment((prev) => ({
      ...prev,
      author: user?._id,
      post: post._id,
    }));
  }, []);

  return (
    <form className="flex flex-1 gap-2" onSubmit={handleComment}>
        <Textarea
          onChange={handleChange}
          placeholder="Your comment"
          id="comment"
          name="comment"
          value={comment.message}
          autoComplete="off"
          className="w-full"
        />
        <Button>{comment._id ? "Update" : "Send"}</Button>
    </form>
  );
}

export default CommentForm;
