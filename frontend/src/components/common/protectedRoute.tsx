import { RootState } from "@/store";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authReducer
  );
  const pathname = useLocation().pathname;

  if (!isAuthenticated && pathname.includes("/dashboard")) {
    return <Navigate to="/" />;
  } else if (isAuthenticated && pathname.includes("/auth")) {
    return <Navigate to="/dashboard" />;
  } else {
    return <>{children}</>;
  }
}

export default ProtectedRoute;
