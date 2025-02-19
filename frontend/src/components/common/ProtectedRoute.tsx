import { RootState } from "@/store";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { pathname } = useLocation();

  if (!isAuthenticated && pathname.includes("/dashboard")) {
    return <Navigate to="/auth/login" />;
  } else if (!isAuthenticated && pathname.includes("/admin")) {
    return <Navigate to="/auth/login" />;
  } else if (
    isAuthenticated &&
    user?.role === "user" &&
    pathname.includes("/admin")
  ) {
    return <Navigate to="/dashboard" />;
  } else if (
    isAuthenticated &&
    user?.role === "admin" &&
    pathname.includes("/dashboard")
  ) {
    return <Navigate to="/admin" />;
  } else if (
    isAuthenticated &&
    pathname.includes("/auth") &&
    user?.role === "user"
  ) {
    return <Navigate to="/dashboard" />;
  } else if (
    isAuthenticated &&
    pathname.includes("/auth") &&
    user?.role === "admin"
  ) {
    return <Navigate to="/admin" />;
  } else {
    return <>{children}</>;
  }
}

export default ProtectedRoute;
