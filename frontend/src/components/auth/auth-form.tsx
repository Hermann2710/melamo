import { onInputTextChange } from "@/config/formEventHandler";
import User from "@/types/User";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface AuthFormProps extends React.ComponentProps<"div"> {
  data: User;
  setData: React.Dispatch<React.SetStateAction<User>>;
  isLogin: boolean;
  fields: { name: string; type: string; label: string; placeholder: string }[];
  btnTitle: string;
}

function AuthForm({ setData, isLogin, fields, btnTitle }: AuthFormProps) {
  return (
    <>
      <div className="flex flex-col gap-6">
        {fields.map((field) => {
          if (field.name === "password" && isLogin) {
            return (
              <div className="grid gap-2" key={field.name}>
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Abcd1234!"
                  required
                  onChange={(e) => onInputTextChange(e, setData)}
                />
              </div>
            );
          } else {
            return (
              <div className="grid gap-2" key={field.name}>
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={(e) => onInputTextChange(e, setData)}
                />
              </div>
            );
          }
        })}
        <Button type="submit" className="w-full">
          {btnTitle}
        </Button>
      </div>
    </>
  );
}

export default AuthForm;
