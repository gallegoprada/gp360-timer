import { Link } from "react-router-dom";

const HeaderWithBackButton: React.FC = () => {
  return (
    <div className="flex items-center p-4">
      <Link
        to="/"
        className="flex items-center text-gray-600 hover:text-gray-800 text-xl gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </Link>
    </div>
  );
};

export default HeaderWithBackButton;
