import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavbarHomeData } from "@/config";
import { RootState } from "@/store";
import { MenuIcon, X } from "lucide-react";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ResponsiveDropdown from "./responsive-dropdown";
import ResponsiveHeader from "./responsive-header";
import LoginBtn from "./login-btn";

function RenderLink({
  link,
  setOpen,
}: {
  link: { title: string; path: string };
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(link.path);
  const navigate = useNavigate();

  const handleNavigate = (e: SyntheticEvent) => {
    e.preventDefault();
    setOpen((prev) => !prev);
    navigate(link.path);
  };

  if (pathname === "/" && isActive) {
    return (
      <Link
        onClick={handleNavigate}
        to={link.path}
        className="w-fit font-semibold text-xl"
      >
        {link.title}
      </Link>
    );
  } else if (isActive) {
    return (
      <Link
        onClick={handleNavigate}
        to={link.path}
        className="w-fit font-semibold text-xl"
      >
        {link.title}
      </Link>
    );
  } else {
    return (
      <Link
        onClick={handleNavigate}
        to={link.path}
        className="w-fit text-gray-400 text-xl hover:text-muted font-semibold"
      >
        {link.title}
      </Link>
    );
  }
}

function HomeNavbarResponsive() {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.authReducer);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="sm:hidden">
          {open ? <X /> : <MenuIcon />}
          <span className="sr-only text-muted">Menu Button</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-foreground" side="left">
        <ResponsiveHeader />
        <div className="flex flex-col gap-3 mt-5 text-muted">
          {NavbarHomeData.map((data) => (
            <RenderLink link={data} key={data.title} setOpen={setOpen} />
          ))}
          {!user ? <LoginBtn /> : <ResponsiveDropdown setOpen={setOpen} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default HomeNavbarResponsive;
