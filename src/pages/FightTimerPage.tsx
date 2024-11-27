import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
// import SecondsCountDownDisplayer from "../components/SecondsCountDownDisplayer";
import TimerDisplay from "../components/SecondsToMinutesDisplay";
import HeaderWithBackButton from "../components/HeaderWithBackButton";

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
  const restMinutes = Number(searchParams.get("rest"));
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
        //   timersArray.push({
        //     round: i + 1,
        //     seconds: restMinutes * 60,
        //     type: "rest",
        //   });
        // }

        timersArray.push({
          round: i + 1,
          seconds: workMinutes * 3,
          type: "work",
        });

        if (i < rounds - 1) {
          timersArray.push({
            round: i + 1,
            seconds: restMinutes * 3,
            type: "rest",
          });
        }
      }
    }

    setTimers(timersArray);

    if (timersArray.length > 0) {
      setCurrentSeconds(timersArray[0].seconds); // Initialize with the first phase’s seconds
    }
  }, [workMinutes, rounds, restMinutes]);

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
    <div className="h-[100vh] w-[100vw]">
      <div className="h-[15%]">
        <HeaderWithBackButton />
      </div>
      <div
        // style={{
        //   backgroundImage: `url("/images/gp360-logo.png")`,
        // }}
        className="h-[85%] bg-center bg-no-repeat"
      >
        {isFinished ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-center text-3xl font-bold mt-8 text-gray-200">
              Bien Hecho!
            </h1>
          </div>
        ) : (
          timers.length > 0 && (
            <div className="flex flex-col items-center h-screen w-screen">
              <div className="flex flex-col items-center w-full justify-center  flex-1">
                <div className="text-center font-bold text-3xl">
                  {timers[currentPhaseIndex].type === "work"
                    ? "ROUND "
                    : "REST "}
                  {timers[currentPhaseIndex].type === "work"
                    ? timers[currentPhaseIndex].round
                        .toString()
                        .concat(" / ", rounds.toString())
                    : timers[currentPhaseIndex].round.toString()}
                  <TimerDisplay totalSeconds={currentSeconds} />
                </div>
                <div className="mt-10" />
                <button
                  onClick={togglePause}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 rounded-md"
                >
                  {isPaused ? "Resume" : "Pause"}
                </button>
              </div>
              {/* <div>
                <div className="mt-10" />
                <div className="flex w-full justify-center items-end space-x-8 space-y-8">
                  <img
                    src="/images/gp360-logo.png"
                    alt="Logo"
                    height={"200px"}
                    width={"200px"}
                  />
                </div>
                <div className="mt-10" />
              </div> */}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FightTimer;
