import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import AdminHeaderRight from "./right";

function AdminHeader() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="w-full px-16 py-5">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={toggleSidebar}>
          <Menu />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <AdminHeaderRight
        />
      </div>
    </div>
  );
}

export default AdminHeader;
