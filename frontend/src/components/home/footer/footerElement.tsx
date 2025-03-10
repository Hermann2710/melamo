import { Link } from "react-router-dom";

type Props = {
  title: string;
  links: { title: string; path: string }[];
};

function FooterElement({ title, links }: Props) {
  return (
    <div>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex flex-col gap-1 mt-4">
        {links.map((link) => (
          <Link
            key={link.title}
            title={link.title}
            children={link.title}
            id={link.title}
            to={link.path}
          />
        ))}
      </div>
    </div>
  );
}

export default FooterElement;
