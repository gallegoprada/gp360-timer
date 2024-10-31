import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import SecondsCountDownDisplayer from "../components/SecondsCountDownDisplayer";
import TimerDisplay from "../components/SecondsToMinutesDisplay";

interface TimerPhase {
  round: number;
  seconds: number;
  type: string;
}

const FightTimer: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Get the values of query parameters and convert them to numbers
  const workMinutes = Number(searchParams.get("work"));
  const rounds = Number(searchParams.get("rounds"));

  // State to hold the sequence of timer phases
  const [timers, setTimers] = useState<TimerPhase[]>([]);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timersArray: TimerPhase[] = [];

    for (let i = 0; i < rounds; i++) {
      if (workMinutes) {
        // timersArray.push({
        //   round: i + 1,
        //   seconds: workMinutes * 60,
        //   type: "work",
        // });

        // if (i < rounds - 1) {
        //   timersArray.push({ round: i + 1, seconds: 60, type: "rest" });
        // }

        timersArray.push({
          round: i + 1,
          seconds: workMinutes * 3,
          type: "work",
        });

        if (i < rounds - 1) {
          timersArray.push({ round: i + 1, seconds: 4, type: "rest" });
        }
      }
    }

    setTimers(timersArray);

    if (timersArray.length > 0) {
      setCurrentSeconds(timersArray[0].seconds); // Initialize with the first phase’s seconds
    }
  }, [workMinutes, rounds]);

  // Countdown logic
  useEffect(() => {
    if (currentPhaseIndex >= timers.length || isPaused || isFinished) return;

    const timer = setInterval(() => {
      setCurrentSeconds((prev) => {
        if (prev > 0) return prev - 1;

        clearInterval(timer);

        // Move to the next phase or mark as finished
        if (currentPhaseIndex < timers.length - 1) {
          setCurrentPhaseIndex((prev) => prev + 1);
        } else {
          setIsFinished(true);
        }

        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPhaseIndex, timers, isPaused, isFinished]);

  // Update the `currentSeconds` whenever the `currentPhaseIndex` changes
  useEffect(() => {
    if (currentPhaseIndex < timers.length) {
      setCurrentSeconds(timers[currentPhaseIndex].seconds);
    }
  }, [currentPhaseIndex, timers]);

  // Toggle pause/resume
  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div>
      {isFinished ? (
        <div>
          <div className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none w-full">
            <Link to="/">Back</Link>
          </div>
          <h1 className="text-center text-3xl font-bold mt-8 text-green-500">
            Bien Hecho!
          </h1>
        </div>
      ) : (
        timers.length > 0 && (
          <div className="flex">
            {/* <SecondsCountDownDisplayer
              seconds={currentSeconds}
              type={timers[currentPhaseIndex].type}
            /> */}
            <div>
              ROUND {timers[currentPhaseIndex].round}/{rounds}
              <TimerDisplay totalSeconds={currentSeconds} />
            </div>
            <button
              onClick={togglePause}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default FightTimer;
