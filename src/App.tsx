import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./Components/layout/DashboardLayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects/Projects";
import ProjectDetails from "./pages/projects/ProjectDetails";
import Tasks from "./pages/tasks/Task";
import TaskDetails from "./pages/tasks/TaskDetails";
import Users from "./pages/users/Users";
import KanbanBoard from "./pages/tasks/KanbanBoard";
import NotFound from "./pages/errors/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/users" element={<Users />} />
        <Route path="/kanban" element={<KanbanBoard />} />
      </Route>


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
