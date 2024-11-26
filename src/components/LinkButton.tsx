import { Link } from "react-router-dom";

interface LinkButtonProps {
  to: string;
  label: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center justify-center ring-2 ring-gray-500 w-full p-4 text-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg w-[80vw]"
    >
      {label}
    </Link>
  );
};

export default LinkButton;
