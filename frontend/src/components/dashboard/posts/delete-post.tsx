import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppDispatch } from "@/store";
import { deletePost } from "@/store/posts";
import Post from "@/types/Post";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function DeletePost({
  post,
  open,
  setOpen,
}: {
  post: Post;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = () => {
    dispatch(deletePost(post._id)).then((action) => {
      if (action.payload.success) {
        setOpen(false);
        toast.success(action.payload.message, {
          closeButton: true,
        });
      } else {
        toast.error(action.payload.message, {
          closeButton: true,
        });
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete post?</DialogTitle>
          <DialogDescription>
            Are you sure? This action cannot be underdone
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose />
          <Button
            className="bg-red-500 focus:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeletePost;
