import {
  LayoutDashboard,
  LayoutList,
  Newspaper,
  SlidersHorizontal,
  Users,
} from "lucide-react";

export const AdminSidebarMenuItems = [
  {
    group: "Home",
    menus: [
      { path: "/admin", name: "Dashboard", Icon: LayoutDashboard },
      { path: "/admin/slider", name: "Slider", Icon: SlidersHorizontal },
    ],
  },
  {
    group: "Blog",
    menus: [
      { path: "/admin/topics", name: "Topics", Icon: LayoutList },
      { path: "/admin/posts", name: "Posts", Icon: Newspaper },
      { path: "/admin/users", name: "Users", Icon: Users },
    ],
  },
];
