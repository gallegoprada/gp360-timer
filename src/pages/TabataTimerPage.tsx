import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SecondsCountDownDisplayer from "../components/SecondsCountDownDisplayer";
import { Link } from "react-router-dom";

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
    <div>
      {isFinished ? (
        <div>
          <div className="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none w-full">
            <Link to="/">Back</Link>
          </div>
          <h1 className="text-center text-3xl font-bold mt-8 text-green-500">
            Bien Hecho!
          </h1>
        </div>
      ) : (
        timers.length > 0 && (
          <SecondsCountDownDisplayer
            seconds={currentSeconds}
            type={timers[currentPhaseIndex].type}
          />
        )
      )}
    </div>
  );
};

export default TabataTimer;
