import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Pomodoro() {
  const { token } = useAuth();
  const { state } = useLocation();
  const currentTask = state?.currentTask || null;
  const DURATIONS = {
    focus: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  };

  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [taskName, setTaskName] = useState(currentTask?.title || "Pomodoro Session");
  const [userTasks, setUserTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      const nextMode =
        mode === "focus"
          ? "short"
          : mode === "short"
          ? "focus"
          : "focus";

      setMode(nextMode);
      setTimeLeft(DURATIONS[nextMode]);
      setIsRunning(false);

      if (mode === "focus") {
        setSessionsCompleted((p) => p + 1);
      }
    }
  }, [timeLeft, mode]);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (s) => {
    const min = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress =
    ((DURATIONS[mode] - timeLeft) / DURATIONS[mode]) * circumference;

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(DURATIONS[newMode]);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="mb-6 text-center animate-fade-in-down">
        <span className="text-gray-500 dark:text-gray-400">
          {currentTask ? "Focusing on:" : "Current Session:"}
        </span>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white truncate max-w-lg">
          {taskName}
        </h2>
      </div>

      {!currentTask && (
        <div className="mb-4">
          <label className="text-gray-500 dark:text-gray-400 text-sm block mb-1">
            Select a task (Optional)
          </label>
          <select
            className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
            onChange={(e) =>
              setTaskName(
                e.target.value === "__none" ? "Pomodoro Session" : e.target.value
              )
            }
          >
            <option value="__none">None</option>
            {userTasks.map((t) => (
              <option key={t._id} value={t.title}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex mb-8 bg-gray-200 dark:bg-gray-800 rounded-full p-1">
        <button
          onClick={() => switchMode("focus")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            mode === "focus"
              ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Focus
        </button>

        <button
          onClick={() => switchMode("short")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            mode === "short"
              ? "bg-white dark:bg-gray-700 shadow text-green-600 dark:text-green-400"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Short Break
        </button>

        <button
          onClick={() => switchMode("long")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            mode === "long"
              ? "bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Long Break
        </button>
      </div>

      <div className="relative mb-8">
        <svg className="w-64 h-64 -rotate-90">
          <circle
            cx="128"
            cy="128"
            r={radius}
            strokeWidth="10"
            className="text-gray-300 dark:text-gray-700"
            fill="transparent"
            stroke="currentColor"
          ></circle>

          <circle
            cx="128"
            cy="128"
            r={radius}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className={`transition-all duration-300 ${
              mode === "focus"
                ? "text-blue-600"
                : mode === "short"
                ? "text-green-500"
                : "text-purple-600"
            }`}
            strokeLinecap="round"
          ></circle>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-mono font-bold text-gray-900 dark:text-white">
            {formatTime(timeLeft)}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {mode === "focus"
              ? "Focus Time"
              : mode === "short"
              ? "Short Break"
              : "Long Break"}
          </span>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setIsRunning((r) => !r)}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(DURATIONS[mode]);
          }}
          className="px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl"
        >
          Reset
        </button>
      </div>

      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Sessions Completed
        </p>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {sessionsCompleted}
        </p>
      </div>
    </div>
  );
}
