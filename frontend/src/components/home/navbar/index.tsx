import { Link } from "react-router-dom";
import HomeNavbarResponsive from "./responsive";
import Container from "@/components/common/container";
import Navlinks from "./navlinks";
import { AudioWaveform } from "lucide-react";

function HomeNavbar() {
  return (
    <div>
      <nav className="bg-foreground shadow">
        <Container>
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-muted text-2xl font-bold flex items-center gap-3">
                <AudioWaveform />
                Douanla Hermann
              </Link>
            </div>
            <HomeNavbarResponsive />
            <Navlinks />
          </div>
        </Container>
      </nav>
    </div>
  );
}

export default HomeNavbar;
