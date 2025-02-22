import { AppDispatch, RootState } from "@/store";
import { updateUser } from "@/store/users";
import User, { initialUserData } from "@/types/User";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import DashboardForm from "../form";
import { AdminUpdateUserFormData } from "@/config/forms";

type DashboardUserFormProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
};

function DashboardUserForm({
  open,
  setOpen,
  selectedId,
  setSelectedId,
}: DashboardUserFormProps) {
  const [user, setUser] = useState<User>(initialUserData);
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.usersReducer);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser({ id: user._id, data: user })).then((action) => {
      if (action.payload.success) {
        setOpen(false);
        setSelectedId("");
        setUser(initialUserData);
        toast.success(action.payload.message, {
          closeButton: true,
        });
      } else {
        toast.success(action.payload.message, {
          closeButton: true,
        });
      }
    });
  };

  useEffect(() => {
    if (selectedId) {
      users.map((user) => {
        if (user._id === selectedId) {
          setUser(user);
        }
      });
    }
  }, [selectedId]);
  return (
    <DashboardForm
      formControls={AdminUpdateUserFormData}
      data={user}
      setData={setUser}
      formTitle="user"
      open={open}
      setOpen={setOpen}
      isEditMode={selectedId !== ""}
      handleSubmit={handleSubmit}
    />
  );
}

export default DashboardUserForm;
