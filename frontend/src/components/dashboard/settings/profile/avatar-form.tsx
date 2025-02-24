import UploadImageForm from "@/components/common/image-upload";
import { AppDispatch, RootState } from "@/store";
import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteAvatar from "./delete-avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateProfileAvatar } from "@/store/auth";

function ProfileAvatarForm() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      return toast.error("Please upload an image", {
        closeButton: true,
      });
    }
    dispatch(updateProfileAvatar({ id: user!._id, avatar: imageUrl })).then(
      (action) => {
        if (action.payload.success) {
          return toast.success(action.payload.message, {
            closeButton: true,
          });
        } else {
          return toast.error(action.payload.message, {
            closeButton: true,
          });
        }
      }
    );
  };
  return (
    <div>
      <UploadImageForm imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <div className="mt-3 flex gap-3">
        <DeleteAvatar />
        <Button onClick={handleUpdateImage}>Update</Button>
      </div>
    </div>
  );
}

export default ProfileAvatarForm;
