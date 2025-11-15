import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Tasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const deleteTask = async(id) => {
    await API.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };
  
  const toggleStatus = async(id) => {
    await API.put(`/tasks/${id}/toggle`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
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
  }, [token]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Tasks</h2>
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
                className="bg-white shadow p-4 rounded-lg border"
              >
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>

                <div className="mt-2 flex justify-between">
                  <span 
                  className={`font-semibold ${task.status === "completed"? "text-green-600": "text-yellow-600" }`}>
                  {task.status}
                  </span>

                  <span className="text-blue-600 font-medium capitalize">
                    {task.priority}
                  </span>
                  <div className="mt-4 flex gap-2">
                    <Link to={`/edit-task/${task._id}`} className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">Edit</Link>
                    <button onClick={() => deleteTask(task._id)}className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
                    <button onClick={() => toggleStatus(task._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                      {task.status === "completed" ? "Mark Pending" : "Mark Completed"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
