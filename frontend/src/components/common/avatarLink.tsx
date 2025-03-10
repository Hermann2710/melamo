import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  username: string;
  avatar?: string;
};

function AvatarLink({ avatar, username }: Props) {
  return (
    <Link to={`/users/${username}`}>
      <Avatar>
        <AvatarImage src={avatar && `/uploads/${avatar}`} />
        <AvatarFallback className="uppercase bg-green-800 text-white font-bold">
          {username.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}

export default AvatarLink;
