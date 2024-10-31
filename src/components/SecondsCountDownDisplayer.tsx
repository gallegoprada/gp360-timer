import React, { useEffect, useState } from "react";

interface CountdownProps {
  seconds: number; // initial seconds to count down from
  type: string; // determines background color
}

const SecondsCountDownTimer: React.FC<CountdownProps> = ({ seconds, type }) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);

  // Define background color based on the type
  const getBackgroundColor = () => {
    switch (type) {
      case "work":
        return "bg-green-400";
      case "rest":
        return "bg-red-500";
      case "coolDown":
        return "bg-blue-300";
      case "warmUp":
        return "bg-gray-200";
      default:
        return "bg-gray-200";
    }
  };

  const getTypeDisplayNames = () => {
    switch (type) {
      case "work":
        return "Trabaja";
      case "rest":
        return "Descansa";
      case "coolDown":
        return "Relajate";
      case "warmUp":
        return "Preparate";
      default:
        return "Unknown";
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${getBackgroundColor()}`}
    >
      <div>
        <h1 className="text-3xl font-bold text-white">
          {getTypeDisplayNames()}
        </h1>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-white">{seconds}</h2>
      </div>
    </div>
  );
};

export default SecondsCountDownTimer;
