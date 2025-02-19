import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";
import Footer from "./footer";
import Header from "./header";
import { AdminSidebarMenuItems } from "@/config";

function renderAdminSidebarMenuItems() {
  const { pathname } = useLocation();
  return (
    <>
      {AdminSidebarMenuItems.map((item) => (
        <SidebarGroup key={item.group}>
          <SidebarGroupLabel>{item.group}</SidebarGroupLabel>
          <SidebarMenu>
            {item.menus.map((menu) => (
              <SidebarMenuItem key={menu.name}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.includes(menu.path)}
                >
                  <Link className="font-medium" to={menu.path}>
                    <menu.Icon />
                    <span>{menu.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

function AdminSidebar() {
  return (
    <Sidebar>
      <Header />
      <SidebarContent className="bg-white flex flex-1">
        {renderAdminSidebarMenuItems()}
      </SidebarContent>
      <Footer />
    </Sidebar>
  );
}

export default AdminSidebar;
