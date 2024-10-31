import React from "react";
import { Link } from "react-router-dom";

const Fight: React.FC = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen min-w-screen bg-hero-pattern bg-cover bg-cente p-20">
      <div className="">
        <div className="flex w-full justify-center items-end space-x-8 space-y-8">
          <img
            src="/images/gp360-logo.png"
            alt="Logo"
            height={"200px"}
            width={"200px"}
          />
        </div>
        <div className="mt-20" />
        <div className="w-auto h-auto">
          <div className="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none w-full">
            <Link to="/fight">Fight</Link>
          </div>
          <div className="mt-10" />
          <div className="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none w-full">
            <Link to="/tabata">Timer</Link>
          </div>
        </div>
      </div>

      <div className="read-the-docs">
        © 2024 GP360 Enterprise. All rights reserved.
      </div>
    </div>
  );
};

export default Fight;
