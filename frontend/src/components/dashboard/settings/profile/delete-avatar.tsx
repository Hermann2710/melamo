import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppDispatch, RootState } from "@/store";
import { updateProfileAvatar } from "@/store/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function DeleteAvatar() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.authReducer);

  const handleDelete = () => {
    dispatch(updateProfileAvatar({ id: user!._id, avatar: "" })).then(
      (action) => {
        if (action.payload.success) {
          return toast.success(action.payload.message, {
            closeButton: true,
          });
        } else {
          return toast.error(action.payload.message, {
            closeButton: true,
          });
        }
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-red-500 hover:bg-red-700">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete profile image</DialogTitle>
          <DialogDescription>
            Are you sure? This action can't be underdone
          </DialogDescription>
        </DialogHeader>
          <Button className="w-fit" onClick={handleDelete}>Delete</Button>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAvatar;
