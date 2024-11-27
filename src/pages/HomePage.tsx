import React, { Children, ReactNode } from "react";
import { Link } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import MainLayout from "../components/MainLayout";

const HomePageContent: React.FC = () => {
  return (
    <>
      <div className="flex w-full justify-center landscape:justify-end lg:landscape:justify-center space-x-8 space-y-8 h-[20cqh] landscape:pr-5 pt-5">
        <img
          src="/images/gp360-logo.png"
          alt="Logo"
          className="aspect-[1.2] h-full"
        />
      </div>
      <div className="w-full flex-1 flex flex-col  items-center gap-10 ">
        <div className="hidden portrait:block lg:landscape:block mt-10" />
        <MenuItem to="/fight" iconSrc="/images/fight.svg" label="Fight" />
        <MenuItem to="/tabata" iconSrc="/images/timer.svg" label="Timer" />
      </div>
    </>
  );
};

const Home: React.FC = () => {
  return (
    <MainLayout>
      <HomePageContent />
    </MainLayout>
  );
};

export default Home;
