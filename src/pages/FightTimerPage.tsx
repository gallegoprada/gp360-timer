import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TimerDisplay from "../components/SecondsToMinutesDisplay";
import HeaderWithBackButton from "../components/HeaderWithBackButton";
import { Howl } from "howler";

interface TimerPhase {
  round: number;
  seconds: number;
  type: string;
}

// Add this near the top of the component, after the interface definition
// const preloadAudio = (url: string): HTMLAudioElement => {
//   const audio = new Audio(url);
//   audio.load(); // Preload the audio file
//   return audio;
// };

// Create sounds once, outside of component
const sounds = {
  start: new Howl({ src: ["/sounds/bell-start.mp3"], preload: true }),
  tenSeconds: new Howl({ src: ["/sounds/Clapper.mp3"], preload: true }),
  end: new Howl({ src: ["/sounds/bell.mp3"], preload: true }),
  secondsOut: new Howl({ src: ["/sounds/seconds_out.mp3"], preload: true }),
};

const FightTimer: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Get the values of query parameters and convert them to numbers
  const workMinutes = Number(searchParams.get("work"));
  const rounds = Number(searchParams.get("rounds"));
  const restSeconds = Number(searchParams.get("restSeconds"));
  const preparationSeconds = Number(searchParams.get("preparationSeconds"));

  // State to hold the sequence of timer phases
  const [timers, setTimers] = useState<TimerPhase[]>([]);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Replace the existing audio refs with preloaded audio
  // const roundStartSound = useRef(preloadAudio("/sounds/bell-start.mp3"));
  // const tenSecondsSound = useRef(preloadAudio("/sounds/Clapper.mp3"));
  // const roundEndSound = useRef(preloadAudio("/sounds/bell.mp3"));

  // Add a preload effect
  // useEffect(() => {
  //   // Create promises for each audio load
  //   const loadPromises = [
  //     roundStartSound.current.load(),
  //     tenSecondsSound.current.load(),
  //     roundEndSound.current.load(),
  //   ];

  //   // Wait for all sounds to load
  //   Promise.all(loadPromises).catch((error) => {
  //     console.error("Error preloading sounds:", error);
  //   });

  //   // Optional: Clean up
  //   return () => {
  //     roundStartSound.current.pause();
  //     tenSecondsSound.current.pause();
  //     roundEndSound.current.pause();
  //   };
  // }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const timersArray: TimerPhase[] = [];

    timersArray.push({
      round: 0,
      seconds: preparationSeconds,
      type: "preparation",
    });

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
            seconds: restSeconds,
            type: "rest",
          });
        }
      }
    }

    setTimers(timersArray);

    if (timersArray.length > 0) {
      setCurrentSeconds(timersArray[0].seconds); // Initialize with the first phase’s seconds
    }
  }, [workMinutes, rounds, restSeconds, preparationSeconds]);

  // Modify the countdown useEffect
  useEffect(() => {
    if (currentPhaseIndex >= timers.length || isPaused || isFinished) return;

    // Play start sound at beginning of work rounds
    if (
      currentSeconds === timers[currentPhaseIndex].seconds &&
      timers[currentPhaseIndex].type === "work"
    ) {
      sounds.start.play();
    }

    const timer = setInterval(() => {
      setCurrentSeconds((prev) => {
        // Play appropriate sound when 10 seconds remaining
        if (prev === 11) {
          if (timers[currentPhaseIndex].type === "work") {
            sounds.tenSeconds.play();
          } else if (timers[currentPhaseIndex].type === "rest") {
            sounds.secondsOut.play();
          }
        }

        if (prev > 0) return prev - 1;

        clearInterval(timer);

        // Play end sound only for work rounds
        if (timers[currentPhaseIndex].type === "work") {
          sounds.end.play();
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
  }, [currentPhaseIndex, timers, isPaused, isFinished, currentSeconds]);

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
      <div className="h-[85%] bg-center bg-no-repeat">
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
                  {timers[currentPhaseIndex].type === "preparation"
                    ? "PREPARATE!"
                    : timers[currentPhaseIndex].type === "work"
                    ? "ROUND "
                    : "REST "}
                  {timers[currentPhaseIndex].type !== "preparation"
                    ? timers[currentPhaseIndex].round
                        .toString()
                        .concat(" / ", rounds.toString())
                    : null}
                  <TimerDisplay totalSeconds={currentSeconds} />
                </div>
                <div className="mt-10" />
                {timers[currentPhaseIndex].type !== "preparation" && (
                  <button
                    onClick={togglePause}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 rounded-md"
                  >
                    {isPaused ? "Resume" : "Pause"}
                  </button>
                )}

                {/* if isPaused we want to also show 2 more buttons 1 to move to NEXT round and the other to restart the current round */}
                {isPaused && (
                  <div className="flex flex-row gap-2">
                    <button
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 rounded-md"
                      onClick={() => {
                        // setCurrentPhaseIndex((prev) => prev - 1);
                        setCurrentSeconds(timers[currentPhaseIndex].seconds);
                        setIsPaused(false);
                      }}
                    >
                      Restart
                    </button>

                    {/* only show next if it has a next round */}
                    {timers[currentPhaseIndex].round < rounds && (
                      <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 rounded-md"
                        onClick={() => {
                          if (timers[currentPhaseIndex].type === "work") {
                            setCurrentPhaseIndex((prev) => prev + 2);
                          } else if (
                            timers[currentPhaseIndex].type === "rest"
                          ) {
                            setCurrentPhaseIndex((prev) => prev + 1);
                          }
                          setCurrentSeconds(timers[currentPhaseIndex].seconds);
                          setIsPaused(false);
                        }}
                      >
                        Next
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FightTimer;
