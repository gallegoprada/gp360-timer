import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import TimerDisplay from "../components/SecondsToMinutesDisplay";
import HeaderWithBackButton from "../components/HeaderWithBackButton";

interface TimerPhase {
  round: number;
  seconds: number;
  type: string;
}

// Add this near the top of the component, after the interface definition
const preloadAudio = (url: string): HTMLAudioElement => {
  const audio = new Audio(url);
  audio.load(); // Preload the audio file
  return audio;
};

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

  // Replace the existing audio refs with preloaded audio
  const roundStartSound = useRef(preloadAudio("/sounds/bell-start.mp3"));
  const tenSecondsSound = useRef(preloadAudio("/sounds/Clapper.mp3"));
  const roundEndSound = useRef(preloadAudio("/sounds/bell.mp3"));

  // Add a preload effect
  useEffect(() => {
    // Create promises for each audio load
    const loadPromises = [
      roundStartSound.current.load(),
      tenSecondsSound.current.load(),
      roundEndSound.current.load(),
    ];

    // Wait for all sounds to load
    Promise.all(loadPromises).catch((error) => {
      console.error("Error preloading sounds:", error);
    });

    // Optional: Clean up
    return () => {
      roundStartSound.current.pause();
      tenSecondsSound.current.pause();
      roundEndSound.current.pause();
    };
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const timersArray: TimerPhase[] = [];

    for (let i = 0; i < rounds; i++) {
      if (workMinutes) {
        timersArray.push({
          round: i + 1,
          seconds: workMinutes * 60,
          type: "work",
        });

        if (i < rounds - 1) {
          timersArray.push({
            round: i + 1,
            seconds: restMinutes * 60,
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
        // Play sound when 10 seconds remaining in work rounds
        if (prev === 11 && timers[currentPhaseIndex].type === "work") {
          tenSecondsSound.current.play().catch(console.error);
        }

        if (prev > 0) return prev - 1;

        clearInterval(timer);

        // Play round end sound for work rounds or final end
        if (
          timers[currentPhaseIndex].type === "work" ||
          currentPhaseIndex === timers.length - 1
        ) {
          roundEndSound.current.play().catch(console.error);
        }

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

  // Add this new effect to play start sound when changing phases
  useEffect(() => {
    if (
      currentPhaseIndex < timers.length &&
      timers[currentPhaseIndex]?.type === "work" &&
      !isPaused &&
      !isFinished
    ) {
      roundStartSound.current.play().catch(console.error);
    }
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
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FightTimer;
