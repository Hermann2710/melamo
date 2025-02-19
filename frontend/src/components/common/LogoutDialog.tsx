import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { logoutUser } from "@/store/auth";
import { toast } from "@/hooks/use-toast";

type LogoutBtnProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function LogoutDialog({ open, setOpen }: LogoutBtnProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(logoutUser()).then((action) => {
      setOpen(false);
      if (action.payload?.success) {
        return toast({
          title: action.payload?.message,
        });
      } else {
        return toast({
          title: action.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can't be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleLogout}>
            Log Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LogoutDialog;
