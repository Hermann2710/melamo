import { Outlet } from "react-router-dom";
import ProtectedRoute from "../common/ProtectedRoute";
import { SidebarProvider } from "../ui/sidebar";
import AdminSidebar from "../admin/Sidebar";
import AdminHeader from "../admin/header";

function AdminLayout() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AdminSidebar />
        <main className="w-full h-full">
          <AdminHeader />
          <Outlet />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

export default AdminLayout;
