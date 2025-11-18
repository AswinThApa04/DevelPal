import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Tasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const toggleStatus = async (id) => {
    try {
      await API.put(
        `/tasks/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Failed to toggle task", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchTasks();
    localStorage.setItem("refreshDashboard", Date.now());
  }, [token]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Tasks</h2>
        <Link 
           to="/dashboard" className="text-blue-600 hover:underline font-medium mb-4 inline-block"
>          ← Back to Dashboard
        </Link>
        <Link
          to="/create-task"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + New Task
        </Link>
      </div>
      <div className="mt-6">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet. Create one!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-800 dark:border-gray-700 p-5 shadow rounded-xl border hover:shadow-lg transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{task.title}</h3>

                  <span
                    className={`px-3 py-1 text-sm rounded-full capitalize
                      ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <p className="text-gray-600  dark:text-gray-300 mt-2">{task.description}</p>
                <div className="mt-3">
                  <span
                    className={`text-sm font-semibold capitalize
                      ${
                        task.status === "completed"
                          ? "text-green-600 dark:text-green-400"
                          : "text-yellow-600 dark:text-yellow-400"
                      }`}
                  >
                    {task.status}
                  </span>
                </div>
                <div className="mt-4 flex gap-3">
                  <Link
                    to={`/edit-task/${task._id}`}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleStatus(task._id)}
                    className={`px-3 py-1 text-white text-sm rounded-md
                      ${
                        task.status === "completed"
                          ? "bg-yellow-500"
                          : "bg-green-600"
                      }`}
                  >
                    {task.status === "completed" ? "Mark Pending" : "Mark Completed"}
                  </button>
                  <Link 
                    to="/pomodoro" 
                    state={{ currentTask: task }}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700">
                    Focus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
