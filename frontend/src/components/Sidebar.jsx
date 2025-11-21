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
        h-screen bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col 
        transition-all duration-300 
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-6 -right-3 w-7 h-7 bg-white dark:bg-gray-700 shadow p-1 rounded-full flex items-center justify-center hover:scale-105 transition"
      >
        {collapsed ? (
          <ChevronRightIcon className="w-4 text-gray-700 dark:text-gray-300" />
        ) : (
          <ChevronLeftIcon className="w-4 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      <h1
        className={`text-2xl font-bold text-blue-600 dark:text-blue-400 mb-10 transition-all duration-200 whitespace-nowrap
          ${collapsed ? "opacity-0" : "opacity-100"}
        `}
      >
        DevPal
      </h1>

      <nav className="space-y-3 flex-1">
        {menu.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`relative flex items-center gap-4 px-4 py-3 rounded-lg font-medium 
              text-gray-700 dark:text-gray-300 hover:bg-blue-50 
              dark:hover:bg-gray-700 transition-all duration-200 group dark:hover
              ${active?"bg-blue-100 dark:bg-gray-700": ""}
              `}
            >
              {active && (
                <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 dark:bg-blue-400 rounded-r-lg"></span>
              )}
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                {item.icon}
              </div>
              {!collapsed && <span>{item.name}</span>}
              {collapsed && (
                <span className="absolute left-20 px-2 py-1 bg-gray-900 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100
                transition ml-2 z-50">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
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
