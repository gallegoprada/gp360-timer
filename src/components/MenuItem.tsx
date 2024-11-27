import React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  to: string;
  iconSrc: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, iconSrc, label }) => {
  return (
    <div>
      <Link
        to={to}
        className="flex flex-row justify-center gap-5 min-h-[50px] ring-2 ring-gray-500 text-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 items-center rounded-lg w-[80cqw] h-[10cqh] md:h-[15cqh] md:w-[50cqw] lg:w-[40cqw]"
      >
        <img
          src={iconSrc}
          className="h-1/2 filter invert opacity-50"
          alt={label}
        />
        <div className="text-lg lg:text-2xl font-medium ">{label}</div>
      </Link>
    </div>
  );
};

export default MenuItem;
