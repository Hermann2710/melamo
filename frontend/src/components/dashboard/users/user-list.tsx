import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/store";
import { Edit2Icon, Loader, Lock, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Dispatch, SetStateAction, useState } from "react";
import DeleteUser from "./delete-user";
import User from "@/types/User";
import { Link } from "react-router-dom";

function DashboardUsersList({
  setSelectedId,
  setOpen,
}: {
  setSelectedId: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { users, isLoading } = useSelector(
    (state: RootState) => state.usersReducer
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const auth = useSelector((state: RootState) => state.authReducer);

  const handleEdit = (user: User) => {
    setSelectedId(user._id);
    setOpen(true);
  };

  const handleDelete = (user: User) => {
    setUser(user);
    setOpenDeleteDialog(true);
  };
  return (
    <>
      <Table className="border">
        <TableCaption>Post List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Identifier</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4}>
                <Loader className="animate-spin" />
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id.substring(0, 6)}...</TableCell>
                <TableCell className="font-medium">
                  <Link to={`${user.username}`}>{user.username}</Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell
                  className={`${user.role === "admin" && "font-semibold"}`}
                >
                  {user.role}
                </TableCell>
                <TableCell className="flex gap-2 cursor-pointer">
                  {user._id !== auth.user!._id ? (
                    <>
                      <Edit2Icon
                        className="w-4"
                        color="orange"
                        onClick={() => handleEdit(user)}
                      />
                      <Trash2
                        color="red"
                        className="w-4 cursor-pointer"
                        onClick={() => handleDelete(user)}
                      />
                    </>
                  ) : (
                    <Lock className="w-4" color="gray" />
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell colSpan={3}>{users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {user && (
        <DeleteUser
          user={user}
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
        />
      )}
    </>
  );
}

export default DashboardUsersList;
