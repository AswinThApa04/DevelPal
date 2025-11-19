import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <HomeIcon className="w-6 h-6" />,
    },
    {
      name: "My Tasks",
      path: "/tasks",
      icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
    },
    {
      name: "Pomodoro",
      path: "/pomodoro",
      icon: <ClockIcon className="w-6 h-6" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <UserCircleIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div
      className={`
        h-screen bg-white dark:bg-gray-800 shadow-lg p-4 flex flex-col 
        transition-all duration-300 
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-4 -right-4 bg-white dark:bg-gray-700 shadow p-1 rounded-full"
      >
        {collapsed ? (
          <ChevronRightIcon className="w-5" />
        ) : (
          <ChevronLeftIcon className="w-5" />
        )}
      </button>

      <h1
        className={`text-2xl font-bold text-blue-600 dark:text-blue-400 mb-10 transition-all 
          ${collapsed ? "opacity-0" : "opacity-100"}
        `}
      >
        DevPal
      </h1>

      <nav className="space-y-3 flex-1">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium 
              text-gray-700 dark:text-gray-300 hover:bg-blue-50 
              dark:hover:bg-gray-700 transition-all
              ${
                location.pathname === item.path
                  ? "bg-blue-100 dark:bg-gray-700"
                  : ""
              }
            `}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 mt-auto bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition"
      >
        <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );
}
