import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function LoginBtn() {
  return (
    <Link to="/auth/login">
      <Button variant="outline" className="w-fit font-semibold text-lg">
        Login
      </Button>
    </Link>
  );
}

export default LoginBtn;
