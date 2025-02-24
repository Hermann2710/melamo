import { AppDispatch, RootState } from "@/store";
import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardSettingsForm from "../form";
import { DashboardProfilePasswordFormControls } from "@/config/forms";
import { updateProfilePassword } from "@/store/auth";
import { toast } from "sonner";
import { isStrongPassword } from "validator";

function ProfilePasswordForm() {
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!data.confirmPassword || !data.currentPassword || !data.newPassword) {
      return toast.error("All fields are required", {
        closeButton: true,
      });
    }
    if (
      !isStrongPassword(data.currentPassword) ||
      !isStrongPassword(data.newPassword)
    ) {
      return toast.error("All password must be valid", {
        closeButton: true,
      });
    } else if (data.newPassword !== data.confirmPassword) {
      return toast.error("The new password don't match", {
        closeButton: true,
      });
    }
    dispatch(updateProfilePassword({ id: user!._id, data: data })).then(
      (action) => {
        if (action.payload.success) {
          toast.success(action.payload.message, { closeButton: true });
        } else {
          toast.error(action.payload.message, { closeButton: true });
        }
      }
    );
  };
  return (
    <DashboardSettingsForm
      formControls={DashboardProfilePasswordFormControls}
      data={data}
      setData={setData}
      handleSubmit={handleSubmit}
      title="password"
    />
  );
}

export default ProfilePasswordForm;
