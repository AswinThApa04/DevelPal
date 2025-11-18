import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await API.post("/tasks", 
        {
          ...formData,
          tags: formData.tags.split(",").map(t => t.trim())
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      navigate("/tasks");
    } catch (err) {
      console.log("Task creation failed", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-3xl font-semibold mb-6">Create New Task</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            placeholder="Task title"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            placeholder="Task description"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            placeholder="give a tag"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
