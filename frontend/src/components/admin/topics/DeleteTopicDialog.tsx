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
import { deleteTopic } from "@/store/topics";
import Topic from "@/types/Topic";
import React, { SetStateAction } from "react";
import { useDispatch } from "react-redux";

type DeleteTopicDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  topic: Topic;
  setTopic: React.Dispatch<SetStateAction<Topic | null>>;
};

function DeleteTopicDialog({
  open,
  setOpen,
  topic,
  setTopic,
}: DeleteTopicDialogProps) {
  const [name, setName] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (topic.name !== name) {
      return;
    } else {
      dispatch(deleteTopic(topic._id)).then((action) => {
        if (action.payload.success) {
          setTopic(null);
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
          <AlertDialogTitle>Delete topic {topic.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="my-3">
              Please enter the topic's name to continue. This action can't be
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
              topic.name === name
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

export default DeleteTopicDialog;
