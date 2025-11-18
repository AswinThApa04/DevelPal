import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Pomodoro = () => {
  const { state } = useLocation();
  const currentTask = state?.currentTask;

  const [mode, setMode] = useState("focus");
  const focusTime = 25 * 60;
  const breakTime = 5 * 60;
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) {
      const newMode = mode === "focus" ? "break" : "focus";
      setMode(newMode);
      setTimeLeft(newMode === "focus" ? focusTime : breakTime);
      if (mode === "focus" && currentTask) {
        setSessionsCompleted(prev => prev + 1);
      }
      setIsRunning(false);
    }
  }, [timeLeft, mode, focusTime, breakTime, currentTask]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? focusTime : breakTime);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = ((mode === "focus" ? focusTime - timeLeft : breakTime - timeLeft) / 
                  (mode === "focus" ? focusTime : breakTime)) * circumference;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      {currentTask && (
        <div className="mb-6 text-center animate-fade-in-down">
          <span className="text-gray-500 dark:text-gray-400">Focusing on:</span>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white truncate max-w-lg">{currentTask.title}</h2>
        </div>
      )}

      <div className="flex mb-8 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
        <button
          onClick={() => { setMode("focus"); setTimeLeft(focusTime); setIsRunning(false); }}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${mode === "focus" ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
        >
          Focus
        </button>
        <button
          onClick={() => { setMode("break"); setTimeLeft(breakTime); setIsRunning(false); }}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${mode === "break" ? "bg-white dark:bg-gray-700 shadow text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
        >
          Break
        </button>
      </div>

      <div className="relative mb-8">
        <svg className="w-64 h-64 -rotate-90">
          <circle cx="128" cy="128" r={radius} stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-300 dark:text-gray-700" />
          <circle
            cx="128"
            cy="128"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className={`transition-all duration-1000 ${mode === "focus" ? "text-blue-600" : "text-green-600"}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-mono font-bold text-gray-800 dark:text-white mb-2">{formatTime(timeLeft)}</span>
          <span className="text-lg font-medium text-gray-500 dark:text-gray-400">{mode === "focus" ? "Focus Time" : "Take a Break"}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-3 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 ${isRunning ? "bg-yellow-500 hover:bg-yellow-600" : mode === "focus" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Reset
        </button>
      </div>

      <div className="text-center">
        <div className="text-gray-600 dark:text-gray-400 mb-1">Sessions Completed</div>
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{sessionsCompleted}</div>
      </div>
    </div>
  );
};

export default Pomodoro;