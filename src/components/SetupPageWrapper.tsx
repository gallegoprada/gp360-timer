import { ReactNode } from "react";
import HeaderWithBackButton from "./HeaderWithBackButton";
import LinkButton from "./LinkButton";

const SetupPageWrapper: React.FC<{
  children: ReactNode;
  to: string;
  title: string;
  buttonLabel: string;
}> = ({ children, to, title, buttonLabel }) => {
  return (
    <div className="h-full">
      <div className="h-[15%]">
        <HeaderWithBackButton />
      </div>
      <div className="h-[70%]">
        <div className="h-full ">
          <div className="flex flex-col gap-10 landscape:gap-2 pt-10 pb-10">
            <h1 className="text-3xl">{title}</h1>
            <div className="h-auto">{children}</div>
          </div>
        </div>
      </div>
      <div className="h-[15%]">
        <div className="flex justify-center portrait:h-[70px] landscape:h-[95%] pl-10 pr-10">
          <LinkButton to={to} label={buttonLabel}></LinkButton>
        </div>
      </div>
    </div>
  );
};

export default SetupPageWrapper;
