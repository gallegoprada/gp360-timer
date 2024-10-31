import React, { useEffect, useState } from "react";

interface TimerDisplayProps {
  totalSeconds: number;
}

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ totalSeconds }) => {
  return <div className="text-3xl font-bold">{formatTime(totalSeconds)}</div>;
};

export default TimerDisplay;
