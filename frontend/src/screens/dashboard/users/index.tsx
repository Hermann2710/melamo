import DashboardUserForm from "@/components/dashboard/users/user-form";
import DashboardUsersList from "@/components/dashboard/users/user-list";
import { AppDispatch } from "@/store";
import { fetchUsers } from "@/store/users";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function DashboardUsers() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Dashboard users list</h1>
      <DashboardUsersList setOpen={setOpen} setSelectedId={setSelectedId} />
      <DashboardUserForm
        open={open}
        setOpen={setOpen}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}

export default DashboardUsers;
