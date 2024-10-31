import React, { useState } from "react";
import { Link } from "react-router-dom";
import NumberInput from "../components/NumberInput";

const Tabata: React.FC = () => {
  const [warmUp, setWarmUp] = useState(5);
  const [work, setWork] = useState(4);
  const [rest, setRest] = useState(2);
  const [rounds, setRounds] = useState(3);
  const [coolDown, setCoolDown] = useState(6);

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
        <h1 className="">Set your Timer</h1>
        <div className="mt-20" />
        <div className="Selector">
          <NumberInput
            label="Preparacion?"
            defaultValue={warmUp}
            onChange={(value) => {
              setWarmUp(value);
            }}
          />
          <div className="mt-10" />
          <NumberInput
            label="Trabajo"
            defaultValue={work}
            onChange={(value) => {
              setWork(value);
            }}
          />
          <div className="mt-10" />
          <NumberInput
            label="Descanso"
            defaultValue={rest}
            onChange={(value) => {
              setRest(value);
            }}
          />
          <div className="mt-10" />
          <NumberInput
            label="Rounds (Trabajo & Descanso)"
            defaultValue={rounds}
            onChange={(value) => {
              setRounds(value);
            }}
          />
          <div className="mt-10" />
          <NumberInput
            label="Relajacion"
            defaultValue={coolDown}
            onChange={(value) => {
              setCoolDown(value);
            }}
          />
        </div>
        <div className="mt-20" />
        <div>
          <Link
            to={`/tabataTimer?warmUp=${warmUp}&work=${work}&rest=${rest}&rounds=${rounds}&coolDown=${coolDown}`}
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

export default Tabata;
