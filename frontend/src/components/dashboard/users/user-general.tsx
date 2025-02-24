import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import User from "@/types/User";

function ProfileGeneral({ user }: { user: User | null }) {
  return !user ? (
    <h1 className="text-xl font-bold">Not available</h1>
  ) : (
    <div>
      <h1 className="font-semibold text-xl">Details of {user.username}</h1>
      <div className="flex flex-col gap-2 mt-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            className="font-semibold"
            value={user.username}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastname">Lastname</Label>
          <Input
            className="font-semibold"
            value={user.lastname ? user.lastname : "Not defined"}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstname">Firstname</Label>
          <Input
            className="font-semibold"
            value={user.firstname ? user.firstname : "Not defined"}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            className="font-semibold"
            value={user.email}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="role">Role</Label>
          <Input
            className="font-semibold capitalize"
            value={user.role}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="createdAt">Created At</Label>
          <Input
            className="font-semibold"
            value={new Date(user.createdAt).toLocaleString()}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileGeneral;
