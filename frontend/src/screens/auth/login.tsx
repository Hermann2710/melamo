import AuthForm from "@/components/auth/auth-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AppDispatch } from "@/store";
import { loginUser } from "@/store/auth";
import User, { initialUserData } from "@/types/User";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const [user, setUser] = useState<User>(initialUserData);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(user)).then((action) => {
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
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <AuthForm
              data={user}
              setData={setUser}
              isLogin={true}
              fields={[
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
                  placeholder: "Password",
                },
              ]}
              btnTitle="Login"
            />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/register"
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
