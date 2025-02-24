import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootState } from "@/store";
import User from "@/types/User";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProfileOverview({ user }: { user: User | null }) {
  const auth = useSelector((state: RootState) => state.authReducer);
  return (
    <div className="full">
      {!user ? (
        <Loader className="animate-spin block mx-auto" />
      ) : (
        <div>
          <Card>
            <CardContent>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Profile informations</CardDescription>
              </CardHeader>
              <div className="flex flex-col gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      className="w-[250px] h-[250px] block mx-auto rounded-full cursor-pointer p-2 border-2 border-blue-500"
                      src={
                        user.avatar ? `/uploads/${user.avatar}` : "/vite.svg"
                      }
                      alt={user.username}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Avatar</DialogTitle>
                      <DialogDescription>
                        Profile image of {user.username}
                      </DialogDescription>
                    </DialogHeader>
                    <img
                      className="block mx-auto"
                      src={
                        user.avatar ? `/uploads/${user.avatar}` : "/vite.svg"
                      }
                      alt={user.username}
                    />
                  </DialogContent>
                </Dialog>
                <div className="flex justify-center items-center gap-10">
                  <div className="flex flex-col justify-center items-center">
                    <Link
                      to={`followings/${user.username}`}
                      className="font-medium"
                    >
                      Followings
                    </Link>
                    <span>{user.followings.length}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <Link
                      to={`followers/${user.username}`}
                      className="font-medium"
                    >
                      Followers
                    </Link>
                    <span>{user.followers.length}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <Link to={`posts/${user.username}`} className="font-medium">
                      Posts
                    </Link>
                    <span>{user.followings.length}</span>
                  </div>
                </div>
                {auth.user?._id !== user._id && (
                  <Button className="w-fit block mx-auto">Follow</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default ProfileOverview;
