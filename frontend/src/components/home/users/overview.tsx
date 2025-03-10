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
import { AppDispatch, RootState } from "@/store";
import { followUser, unFollowUser } from "@/store/users";
import User from "@/types/User";
import { Loader, Mails } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function HomeProfileOverview({ user }: { user: User | null }) {
  const auth = useSelector((state: RootState) => state.authReducer);
  const { posts } = useSelector((state: RootState) => state.postsReducer);
  const dispatch = useDispatch<AppDispatch>();

  const findPosts = () => {
    let count = 0;
    posts.map((post) => {
      if (user) {
        if (post.author._id === user._id) {
          count += 1;
        }
      }
    });
    return count;
  };

  const follow = () => {
    if (!user) {
      return false;
    } else {
      return user.followers.includes(auth.user!._id);
    }
  };

  const handleFollow = () => {
    dispatch(followUser({ user_1: user!._id, user_2: auth.user!._id })).then(
      (action) => {
        if (action.payload.success) {
          return toast.success(action.payload.message, { closeButton: true });
        } else {
          return toast.error(action.payload.message, { closeButton: true });
        }
      }
    );
  };

  const handleUnFollow = () => {
    dispatch(unFollowUser({ user_1: user!._id, user_2: auth.user!._id })).then(
      (action) => {
        if (action.payload.success) {
          return toast.success(action.payload.message, { closeButton: true });
        } else {
          return toast.error(action.payload.message, { closeButton: true });
        }
      }
    );
  };

  return (
    <div className="w-full py-2">
      {!user ? (
        <Loader className="animate-spin block mx-auto" />
      ) : (
        <div>
          <Card>
            <CardContent>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Profile informations</CardDescription>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0">
                  <div className="flex flex-col gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <img
                          className="w-[250px] h-[250px] block mx-auto rounded-full cursor-pointer p-2 border-2 border-blue-500"
                          src={
                            user.avatar
                              ? `/uploads/${user.avatar}`
                              : "/vite.svg"
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
                            user.avatar
                              ? `/uploads/${user.avatar}`
                              : "/vite.svg"
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
                        <Link
                          to={`posts/${user.username}`}
                          className="font-medium"
                        >
                          Posts
                        </Link>
                        <span>{findPosts()}</span>
                      </div>
                    </div>
                    {auth.user?._id !== user._id && (
                      <div className="flex justify-center gap-2">
                        {follow() ? (
                          <Button
                            onClick={handleUnFollow}
                            variant="destructive"
                          >
                            Unfollow
                          </Button>
                        ) : (
                          <Button onClick={handleFollow}>Follow</Button>
                        )}
                        <Link to={`/messages/${user.username}`}>
                          <Button variant="outline">
                            <Mails />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 text-lg">
                    <h1 className="text-xl font-bold">Profile Details</h1>
                    <p>
                      Username:{" "}
                      <span className="font-medium">{user.username}</span>
                    </p>
                    <p>
                      Firstname:{" "}
                      <span className="font-medium">{user.firstname}</span>
                    </p>
                    <p>
                      Lastname:{" "}
                      <span className="font-medium">{user.lastname}</span>
                    </p>
                    <p>
                      Email: <span className="font-medium">{user.email}</span>
                    </p>
                  </div>
                </div>
              </CardHeader>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default HomeProfileOverview;
