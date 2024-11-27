import { ReactNode } from "react";

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-[100vh] w-[100vw]">
      <div className="flex flex-col gap-10 landscape:gap-2 h-full w-full min-h-screen overflow-y-hidden max-h-screen min-w-screen bg-hero-pattern bg-cover bg-center">
        <div className="flex-1 overflow-y-hidden">{children}</div>

        <div className="read-the-docs flex justify-center h-[40px] pb-5 items-center">
          © 2024 GP360 Enterprise. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
