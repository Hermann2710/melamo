import { NavbarHomeData } from "@/config";
import { RootState } from "@/store";
import { SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginBtn from "./login-btn";
import ResponsiveDropdown from "./responsive-dropdown";

export function RenderLink({
  link,
}: {
  link: { title: string; path: string };
}) {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(link.path);
  const navigate = useNavigate();

  const handleNavigate = (e: SyntheticEvent) => {
    e.preventDefault();
    navigate(link.path);
  };

  if (pathname === "/" && isActive) {
    return (
      <Link
        onClick={handleNavigate}
        to={link.path}
        className="w-fit font-semibold text-lg text-muted"
      >
        {link.title}
      </Link>
    );
  } else if (isActive) {
    return (
      <Link
        onClick={handleNavigate}
        to={link.path}
        className="w-fit font-semibold text-lg text-muted"
      >
        {link.title}
      </Link>
    );
  } else {
    return (
      <Link
        onClick={handleNavigate}
        to={link.path}
        className="w-fit text-gray-400 text-lg hover:text-muted font-semibold text-muted-foreground"
      >
        {link.title}
      </Link>
    );
  }
}

function Navlinks() {
  const { user } = useSelector((state: RootState) => state.authReducer);
  return (
    <div className="hidden sm:flex items-center gap-5">
      {NavbarHomeData.map((data) => (
        <RenderLink link={data} key={data.title} />
      ))}
      {!user ? <LoginBtn /> : <ResponsiveDropdown setOpen={() => {}} />}
    </div>
  );
}

export default Navlinks;
