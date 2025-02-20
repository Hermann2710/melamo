import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AppDispatch } from "@/store";
import { deletePost } from "@/store/posts";
import Post from "@/types/Post";
import React, { SetStateAction } from "react";
import { useDispatch } from "react-redux";

type DeletePostDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post;
  setPost: React.Dispatch<SetStateAction<Post | null>>;
};

function DeletePostDialog({
  open,
  setOpen,
  post,
  setPost,
}: DeletePostDialogProps) {
  const [name, setName] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (post.title !== name) {
      return;
    } else {
      dispatch(deletePost(post._id)).then((action) => {
        if (action.payload.success) {
          setPost(null);
          setOpen(false);
          return toast({
            title: action.payload.message,
          });
        } else {
          return toast({
            title: action.payload.message,
            variant: "destructive",
          });
        }
      });
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete post {post.title}?</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="my-3">
              Please enter the post's name to continue. This action can't be
              underdone
            </p>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={`${
              post.title === name
                ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                : "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
            }`}
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeletePostDialog;
