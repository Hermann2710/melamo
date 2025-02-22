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
import { deleteUser } from "@/store/users";
import User from "@/types/User";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function DeleteUser({
  user,
  open,
  setOpen,
}: {
  user: User;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = () => {
    dispatch(deleteUser(user._id)).then((action) => {
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
          <DialogTitle>Delete user {user.username}?</DialogTitle>
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

export default DeleteUser;
