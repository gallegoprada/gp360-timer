import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SecondsCountDownDisplayer from "../components/SecondsCountDownDisplayer";
import HeaderWithBackButton from "../components/HeaderWithBackButton";

interface TimerPhase {
  seconds: number;
  type: string;
}

const TabataTimer: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Get the values of query parameters and convert them to numbers
  const warmUpSeconds = Number(searchParams.get("warmUp"));
  const workSeconds = Number(searchParams.get("work"));
  const restSeconds = Number(searchParams.get("rest"));
  const rounds = Number(searchParams.get("rounds"));
  const coolDownSeconds = Number(searchParams.get("coolDown"));

  // State to hold the sequence of timer phases
  const [timers, setTimers] = useState<TimerPhase[]>([]);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timersArray: TimerPhase[] = [];

    if (warmUpSeconds) {
      timersArray.push({ seconds: warmUpSeconds, type: "warmUp" });
    }

    for (let i = 0; i < rounds; i++) {
      if (workSeconds) {
        timersArray.push({ seconds: workSeconds, type: "work" });
      }
      if (restSeconds) {
        timersArray.push({ seconds: restSeconds, type: "rest" });
      }
    }

    if (coolDownSeconds) {
      timersArray.push({ seconds: coolDownSeconds, type: "coolDown" });
    }

    setTimers(timersArray);
    if (timersArray.length > 0) {
      setCurrentSeconds(timersArray[0].seconds); // Initialize with the first phase’s seconds
    }
  }, [warmUpSeconds, workSeconds, restSeconds, rounds, coolDownSeconds]);

  // Countdown logic
  useEffect(() => {
    if (currentPhaseIndex >= timers.length || currentSeconds === 0) return;

    const timer = setInterval(() => {
      setCurrentSeconds((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timer);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPhaseIndex, currentSeconds, timers]);

  // Move to the next phase when currentSeconds reaches 0
  useEffect(() => {
    if (currentSeconds === 0 && currentPhaseIndex < timers.length - 1) {
      setCurrentPhaseIndex((prev) => prev + 1);
      setCurrentSeconds(timers[currentPhaseIndex + 1].seconds);
    } else if (
      currentSeconds === 0 &&
      currentPhaseIndex === timers.length - 1
    ) {
      setIsFinished(true);
    }
  }, [currentSeconds, currentPhaseIndex, timers]);

  return (
    <div className="h-[100vh] w-[100vw]">
      <div className="h-[15%]">
        <HeaderWithBackButton />
      </div>
      <div className="h-[85%]">
        {isFinished ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-center text-3xl font-bold mt-8 text-gray-200">
              Bien Hecho!
            </h1>
          </div>
        ) : (
          timers.length > 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-full h-full">
                <SecondsCountDownDisplayer
                  seconds={currentSeconds}
                  type={timers[currentPhaseIndex].type}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TabataTimer;
