import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects/Projects";
import ProjectDetails from "./pages/projects/ProjectDetails";
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
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;