import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileDetailsForm from "../settings/profile/details-form";
import ProfilePasswordForm from "../settings/profile/password-form";
import ProfileAvatarForm from "../settings/profile/avatar-form";
import User from "@/types/User";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProfileGeneral from "./user-general";

function ProfileEdit({ user }: { user: User | null }) {
  const auth = useSelector((state: RootState) => state.authReducer);
  return (
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        {user?._id === auth.user?._id && (
          <>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="avatar">Profile image</TabsTrigger>
          </>
        )}
      </TabsList>
      <div className="mt-2 w-full lg:max-w-lg">
        <TabsContent value="general">
          <ProfileGeneral user={user} />
        </TabsContent>
        {user?._id && auth.user?._id && (
          <>
            <TabsContent value="profile">
              <ProfileDetailsForm />
            </TabsContent>
            <TabsContent value="password">
              <ProfilePasswordForm />
            </TabsContent>
            <TabsContent value="avatar">
              <ProfileAvatarForm />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
}

export default ProfileEdit;
