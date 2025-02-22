import * as React from "react";
import { NavMain } from "@/components/dashboard/sidebar/nav-main";
import { NavProjects } from "@/components/dashboard/sidebar/nav-projects";
import { NavUser } from "@/components/dashboard/sidebar/nav-user";
import { TeamSwitcher } from "@/components/dashboard/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarDashboardData } from "@/config";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={SidebarDashboardData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SidebarDashboardData.navMain} />
        <NavProjects projects={SidebarDashboardData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
