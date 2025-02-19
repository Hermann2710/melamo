import LogoutDialog from "@/components/common/LogoutDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState } from "@/store";
import { Cog, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

function AdminHeaderRight() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="select-none" asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={user?.profilePic ? `/uploads/${user?.profilePic}` : ""}
              alt={user?.username}
            />
            <AvatarFallback className="bg-green-500 text-white uppercase font-bold">
              {user?.username.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Cog />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500 focus:bg-red-500 focus:text-white"
            onClick={() => setOpenDialog(true)}
          >
            <LogOut />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}

export default AdminHeaderRight;
