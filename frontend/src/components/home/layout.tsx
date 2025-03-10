import ProtectedRoute from "@/components/common/protectedRoute";
import HomeNavbar from "./navbar";
import HomeFooter from "./footer";
import { Outlet } from "react-router-dom";
import Container from "../common/container";
import DynamicBreadcrumd from "../common/breadcrumb";

export default function HomeLayout() {
  return (
    <ProtectedRoute>
      <HomeNavbar />
      <Container>
        <div className="font-bold mt-3">
        <DynamicBreadcrumd />
        </div>
        <Outlet />
      </Container>
      <HomeFooter />
    </ProtectedRoute>
  );
}
