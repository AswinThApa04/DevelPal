import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask"; 
import Tasks from "./pages/Tasks";
import DarkToggle from "./components/DarkToggle";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>}/>
        <Route path="/create-task" element={<ProtectedRoute><CreateTask /></ProtectedRoute>}/>
        <Route path="/edit-task/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>}/>
        <Route path="*" element={<Login />} />
      </Routes>
      <div className="fixed top-4 right-4 z-50">
        <DarkToggle />
      </div>
    </BrowserRouter>
  );
}

export default App;
