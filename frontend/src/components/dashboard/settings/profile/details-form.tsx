import { AppDispatch, RootState } from "@/store";
import { updateProfileDetails } from "@/store/auth";
import User from "@/types/User";
import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { DashboardProfileDetailsFormControls } from "@/config/forms";
import DashboardSettingsForm from "../form";

function ProfileDetailsForm() {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const [data, setData] = useState<User>(user!);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    user && setData(data);
  }, [user]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateProfileDetails({ id: data._id, data: data })).then(
      (action) => {
        if (action.payload.success) {
          toast.success(action.payload.message, { closeButton: true });
        } else {
          toast.success(action.payload.message, { closeButton: true });
        }
      }
    );
  };

  return (
    <DashboardSettingsForm
      formControls={DashboardProfileDetailsFormControls}
      data={data}
      setData={setData}
      handleSubmit={handleSubmit}
      title="details"
    />
  );
}

export default ProfileDetailsForm;
