import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

export default function Profile() {
  const { user, token, login } = useAuth();

  const [username, setUsername] = useState(user?.username || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(
        "/users/update",
        { username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      login(res.data, token);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Update failed");
    }
  };

  const changePass = async (e) => {
    e.preventDefault();
    try {
      await API.put(
        "/users/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      alert("Password update failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-xl mx-auto p-6 mt-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Profile Settings
          </h2>

          <form
            onSubmit={updateProfile}
            className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          >
            <h3 className="text-xl font-semibold mb-2">Update Profile</h3>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="text"
                value={user?.email}
                disabled
                className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-md dark:bg-gray-700"
              />
            </div>

            <button className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
              Save Changes
            </button>
          </form>

          <form
            onSubmit={changePass}
            className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-8"
          >
            <h3 className="text-xl font-semibold mb-2">Change Password</h3>

            <div>
              <label className="block font-medium">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 border rounded-md dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block font-medium">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded-md dark:bg-gray-700"
              />
            </div>

            <button className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
