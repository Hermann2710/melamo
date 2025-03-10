import { AudioWaveform, LocateIcon, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

function FooterTitle() {
  return (
    <div>
      <Link
        to="/"
        className="text-muted text-2xl font-bold flex items-center gap-3"
      >
        <AudioWaveform />
        Douanla Hermann
      </Link>
      <p className="mt-4">Lorem ipsum dolor sit amet consectetur</p>
      <div className="mt-3 text-sm flex flex-col gap-1">
        <p className="inline-flex gap-1">
          <LocateIcon /> Douala, Littoral, Cameroun
        </p>
        <Link
          to="mailto:douanlahermann93@gmail.com"
          className="inline-flex gap-1"
        >
          <Mail /> douanlahermann93@gmail.com
        </Link>
        <Link to="whatsapp:+237692339087" className="inline-flex gap-1">
          <Phone /> +237 692 339 087
        </Link>
      </div>
    </div>
  );
}

export default FooterTitle;
