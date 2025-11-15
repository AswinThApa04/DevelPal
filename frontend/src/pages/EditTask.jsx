import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("pending");

  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const res = await API.get(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const task = res.data;

      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
      setTags(task.tags.join(", "));
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch task", error);
      navigate("/tasks");
    }
  };

  useEffect(() => {
    if (token) fetchTask();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(
        `/tasks/${id}`,
        {
          title,
          description,
          priority,
          status,
          tags: tags.split(",").map((tag) => tag.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/tasks");
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  if (loading) return <p className="p-8 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Edit Task</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-md h-32"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 border rounded-md"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}
