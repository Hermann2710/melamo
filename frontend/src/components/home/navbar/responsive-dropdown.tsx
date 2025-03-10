import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppDispatch, RootState } from "@/store";
import { logoutUser } from "@/store/auth";
import { LogOut } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function ResponsiveDropdown({ setOpen }: Props) {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logoutUser()).then((action) => {
      toast.success(action.payload.message, { closeButton: true });
    });
    setOpen(false);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link to="" className="flex gap-3 items-center font-bold text-muted">
          {user!.username}
          <Avatar className="cursor-pointer border border-muted">
            <AvatarImage
              src={`/uploads/${user!.avatar}`}
              alt={user!.username}
            />
            <AvatarFallback className="text-white bg-green-700 font-bold uppercase">
              {user!.username.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-3">
        <DropdownMenuItem>
          <Link className="text-foreground" to="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="text-foreground" to="/dashboard/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            className="text-red-500 w-full focus:bg-foreground focus:text-red-500"
            onClick={handleLogout}
          >
            <LogOut />
            <span>Log Out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ResponsiveDropdown;
