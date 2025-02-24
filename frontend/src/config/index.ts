import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  Settings2,
  Frame,
  PieChart,
  Map,
  LayoutDashboard,
} from "lucide-react";

export const API = "http://localhost:5000/api";

// This is sample data.
export const SidebarDashboardData = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Admin",
      url: "/dashboard",
      isActive: true,
      icon: LayoutDashboard,
      items: [
        {
          title: "Home",
          url: "/dashboard",
        },
        {
          title: "Posts",
          url: "/dashboard/posts",
        },
        {
          title: "Users",
          url: "/dashboard/users",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard/settings",
        },
        {
          title: "Profile",
          url: "/dashboard/profile",
        },
        {
          title: "Notifications",
          url: "#",
        },
        {
          title: "Display",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
