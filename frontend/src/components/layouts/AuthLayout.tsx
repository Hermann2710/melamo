import { Outlet } from "react-router-dom";
import ProtectedRoute from "../common/ProtectedRoute";

export default function LoginPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
}
