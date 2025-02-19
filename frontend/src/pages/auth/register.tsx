import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import validator from "validator";
import { handleChangeInput } from "@/hooks/useFormInput";

export default function Register({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!data.username) {
      return toast({
        title: "The username is required",
        variant: "destructive",
      });
    } else if (!validator.isEmail(data.email)) {
      return toast({
        title: "The email is not valid",
        variant: "destructive",
      });
    } else if (!validator.isStrongPassword(data.password)) {
      return toast({
        title:
          "The password must be at least 12 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-balance text-muted-foreground">
                  Create your Melamo account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="John Doe"
                  name="username"
                  onChange={(e) => handleChangeInput(e, setData)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  onChange={(e) => handleChangeInput(e, setData)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  name="password"
                  onChange={(e) => handleChangeInput(e, setData)}
                />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/auth/login" className="underline underline-offset-4">
                  Sign In
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/register.jpg"
              alt="background"
              className="absolute object-cover inset-0 h-full w-full dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <Link to="#">Terms of Service</Link> and{" "}
        <Link to="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
