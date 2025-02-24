import ProfileOverview from "@/components/dashboard/settings/profile/overview";
import ProfileEdit from "@/components/dashboard/users/user-edit";
import { RootState } from "@/store";
import User from "@/types/User";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function DashboardUsersDetails() {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const { users } = useSelector((state: RootState) => state.usersReducer);

  useEffect(() => {
    users.forEach((user) => {
      if (user.username === username) {
        setUser(user);
      }
    });
  }, [users]);
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-xl">Profile details</h1>
      {!user ? (
        <h1 className="font-bold text-xl">User doesn't exist</h1>
      ) : (
        <div className="grid grid-cols-1 gap-y-4 lg:gap-x-16 lg:grid-cols-2 mt-5 mx-5">
          <ProfileOverview user={user} />
          <ProfileEdit user={user} />
        </div>
      )}
    </div>
  );
}

export default DashboardUsersDetails;
