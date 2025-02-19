import { Outlet } from "react-router-dom";
import ProtectedRoute from "../common/ProtectedRoute";
import { SidebarProvider } from "../ui/sidebar";
import AdminSidebar from "../admin/Sidebar";
import AdminHeader from "../admin/header";
import DynamicBreadcrumbs from "../common/DynamicBreadcrumbs";

function AdminLayout() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AdminSidebar />
        <main className="w-full h-full">
          <AdminHeader />
          <div className="mx-8 lg:mx-12 xl:mx-18">
            <DynamicBreadcrumbs />
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

export default AdminLayout;
