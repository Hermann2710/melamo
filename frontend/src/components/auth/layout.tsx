import ProtectedRoute from "../common/protectedRoute";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default AuthLayout;
