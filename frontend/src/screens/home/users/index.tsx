import HomeProfileOverview from "@/components/home/users/Overview";
import { RootState } from "@/store";
import User from "@/types/User";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function HomeUsers() {
  const [user, setUser] = useState<User | null>(null);
  const { users } = useSelector((state: RootState) => state.usersReducer);
  const { username } = useParams();

  useEffect(() => {
    users.map((u) => {
      if (u.username === username) {
        setUser(u);
      }
    });
  }, [username, users]);
  return <HomeProfileOverview user={user} />;
}

export default HomeUsers;
