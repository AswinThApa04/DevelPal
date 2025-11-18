import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout, token } = useAuth();
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  const fetchStats = async () => {
    try {
      console.log("Sending token:", token);
      const res = await API.get("/tasks/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Stats:", res.data);
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };
  
  useEffect(() => {
    if (token) fetchStats();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-blue-600 dark:bg-gray-800 mb-8">
          DevPal
        </h1>

        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="block font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          >
            Dashboard
          </Link>
          <Link
            to="/tasks"
            className="block text-gray-700 font-medium dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          >
            My Tasks
          </Link>
          <Link
            to="/profile"
            className="block font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          >
            Profile
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-10 bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold">
          Welcome back,{" "}
          <span className="text-blue-600 dark:text-blue-400">
            {user?.username}
          </span>
        </h2>

        <p className="text-gray-600 mt-2 dark:text-gray-300 ">
          Here's your productivity dashboard.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-xl">
            <h3 className="text-lg font-semibold">Total Tasks</h3>
            <p className="text-3xl font-bold text-blue-600 mt-3">
              {stats.total}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-xl">
            <h3 className="text-lg font-semibold">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-3">
              {stats.completed}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-xl">
            <h3 className="text-lg font-semibold">Pending</h3>
            <p className="text-3xl font-bold text-yellow-500 mt-3">
              {stats.pending}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
