import { SidebarHeader } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <SidebarHeader className={"bg-white"}>
      <div className="flex gap-2 items-center justify-center">
        <Link className="select-none font-bold text-2xl" to="/admin">
          Admin Panel
        </Link>
      </div>
    </SidebarHeader>
  );
}

export default Header;
