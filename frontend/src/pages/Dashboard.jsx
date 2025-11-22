import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import {
  CheckBadgeIcon,
  ClockIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  const fetchStats = async () => {
    try {
      const res = await API.get("/tasks/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      <Sidebar />

      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Welcome back,{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {user?.username}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your productivity progress
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition rounded-xl p-6 flex items-center gap-4">
            <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900">
              <ListBulletIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Tasks</h3>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {stats.total}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition rounded-xl p-6 flex items-center gap-4">
            <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900">
              <CheckBadgeIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Completed</h3>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
                {stats.completed}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition rounded-xl p-6 flex items-center gap-4">
            <div className="p-4 rounded-xl bg-yellow-100 dark:bg-yellow-900">
              <ClockIcon className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Pending</h3>
              <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                {stats.pending}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
