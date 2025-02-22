import AuthForm from "@/components/auth/auth-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AppDispatch } from "@/store";
import { registerUser } from "@/store/auth";
import User, { initialUserData } from "@/types/User";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Register() {
  const [user, setUser] = useState<User>(initialUserData);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(user)).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message, {
          closeButton: true,
        });
        setUser(initialUserData);
      } else {
        toast.error(action.payload.message, {
          closeButton: true,
        });
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", "")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Fill the entries below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <AuthForm
              data={user}
              setData={setUser}
              isLogin={false}
              fields={[
                {
                  name: "username",
                  label: "Username",
                  type: "text",
                  placeholder: "Username",
                },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "Email",
                },
                {
                  name: "password",
                  label: "Password",
                  type: "password",
                  placeholder: "Abcd1234!",
                },
              ]}
              btnTitle="Register"
            />
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
