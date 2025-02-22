import DashboardUserForm from "@/components/dashboard/users/user-form";
import DashboardUsersList from "@/components/dashboard/users/user-list";
import { useState } from "react";

function DashboardUsers() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-3">Dashboard users list</h1>
        <DashboardUsersList setOpen={setOpen} setSelectedId={setSelectedId} />
      </div>
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
