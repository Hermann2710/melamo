import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppDispatch } from "@/store";
import { deleteComment, fetchComments } from "@/store/comments";
import Comment from "@/types/Comment";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  comment: Comment;
};

function DeleteComment({ open, setOpen, comment }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteComment(comment._id)).then((action) => {
      toast.error(action.payload.message, { closeButton: true });
      dispatch(fetchComments({ post: comment.post._id }));
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Are you sure</DialogTitle>
        <DialogDescription>
          If you delete this comment the action cannot be underdone
        </DialogDescription>
        <div className="flex gap-2">
          <DialogClose>
            <Button>Cancel</Button>
          </DialogClose>
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteComment;
