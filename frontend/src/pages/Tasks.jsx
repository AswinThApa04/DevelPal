import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Tasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);

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
  }, [token]);
  
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold">My Tasks</h2>

      <div className="mt-6">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet. Create one!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white shadow p-4 rounded-lg border"
              >
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>

                <div className="mt-2 flex justify-between">
                  <span
                    className={`font-semibold ${
                      task.status === "completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {task.status}
                  </span>

                  <span className="text-blue-600 font-medium capitalize">
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
