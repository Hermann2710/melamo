import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { logoutUser } from "@/store/auth";
import { AppDispatch } from "@/store";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

function LogoutDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logoutUser()).then((action) => {
      if (action.payload.success) {
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
    <Dialog>
      <DialogTrigger asChild>
        <span className="inline-flex items-center gap-2">
          <LogOut />
          Log Out
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log out ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose />
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600"
          >
            Log out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutDialog;
