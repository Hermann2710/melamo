import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { AudioWaveform } from "lucide-react";
import { Link } from "react-router-dom";

function ResponsiveHeader() {
  return (
    <SheetHeader>
      <SheetTitle>
        <Link
          to="/"
          className="text-2xl font-bold flex flex-row gap-2 items-center text-muted"
        >
          <AudioWaveform />
          <span>Douanla Hermann</span>
        </Link>
      </SheetTitle>
      <SheetDescription className="sr-only text-muted">
        The responsive navbar
      </SheetDescription>
    </SheetHeader>
  );
}

export default ResponsiveHeader;
