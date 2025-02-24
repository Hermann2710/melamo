import ProfileAvatarForm from "@/components/dashboard/settings/profile/avatar-form";
import ProfileDetailsForm from "@/components/dashboard/settings/profile/details-form";
import ProfileOverview from "@/components/dashboard/settings/profile/overview";
import ProfilePasswordForm from "@/components/dashboard/settings/profile/password-form";
import ProfileEdit from "@/components/dashboard/users/user-edit";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

function DashboardProfile() {
  const { user } = useSelector((state: RootState) => state.authReducer);
  return (
    <div>
      <h1 className="text-xl font-bold">Profile Settings</h1>
      <div className="grid grid-cols-1 gap-y-4 lg:gap-x-16 lg:grid-cols-2 mt-5 mx-5">
        <ProfileOverview user={user} />
        <ProfileEdit user={user} />
      </div>
    </div>
  );
}

export default DashboardProfile;
