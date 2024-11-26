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
        className="flex flex-row justify-center gap-5 min-h-[50px] text-gray-800 items-center rounded-3xl w-[80cqw] h-[10cqh] md:h-[15cqh] bg-gray-300 md:w-[50cqw] lg:w-[40cqw]"
      >
        <img src={iconSrc} className="h-1/2" alt={label} />
        <div className="text-lg lg:text-2xl ">{label}</div>
      </Link>
    </div>
  );
};

export default MenuItem;
