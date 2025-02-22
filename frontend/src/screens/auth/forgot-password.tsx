import AuthForm from "@/components/auth/auth-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import User, { initialUserData } from "@/types/User";
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [user, setUser] = useState<User>(initialUserData);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    alert("Will be ready soon!...");
  };
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Forgot password</CardTitle>
          <CardDescription>Enter your email below to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <AuthForm
              data={user}
              setData={setUser}
              isLogin={false}
              fields={[
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "Email",
                },
              ]}
              btnTitle="Send verification link"
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

export default ForgotPassword;
