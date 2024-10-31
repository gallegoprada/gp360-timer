import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NumberInput from "../components/NumberInput";

const Fight: React.FC = () => {
  const [rounds, setRounds] = useState(3);
  const [workMinutes, setWorkMinutes] = useState(3);

  return (
    <div className="flex flex-col justify-between min-h-screen min-w-screen bg-hero-pattern bg-cover bg-cente p-20">
      <div className="">
        <div className="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none w-full">
          <Link to="/">Back</Link>
        </div>
        <div className="flex w-full justify-center items-end space-x-8 space-y-8">
          {/* <img
            src="/images/gp360-logo.png"
            alt="Logo"
            height={"200px"}
            width={"200px"}
          /> */}
        </div>
        {/* <div className="mt-20" /> */}
        <h1 className="">Ready To Fight?</h1>
        <div className="mt-20" />
        <div className="Selector">
          <NumberInput
            label="Cuantos Rounds?"
            defaultValue={rounds}
            onChange={(value) => {
              setRounds(value);
            }}
          />
          <div className="mt-10" />
          <NumberInput
            label="De Cuantos Minutos?"
            defaultValue={workMinutes}
            onChange={(value) => {
              setWorkMinutes(value);
            }}
          />
        </div>
        <div className="mt-20" />
        <div>
          <Link
            to={`/fightTimer?&work=${workMinutes}&rounds=${rounds}`}
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none w-full"
          >
            Start
          </Link>
        </div>
      </div>

      <div className="read-the-docs">
        © 2024 GP360 Enterprise. All rights reserved.
      </div>
    </div>
  );
};

export default Fight;
