import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  CheckSquare,
  Settings,
  LogOut,
  BriefcaseBusiness,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-900 text-white">
      {/* Logo */}

      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-xl">
            D
          </div>

          <div>
            <h2 className="text-xl text-font-bold text-white">Project</h2>

            <p className="text-sm text-slate-400">Management Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">
        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/analytics" className={linkClass}>
          <BarChart3 size={20} />
          Analytics
        </NavLink>

        <NavLink to="/projects" className={linkClass}>
          <FolderKanban size={20} />
          Projects
        </NavLink>

        <NavLink to="/tasks" className={linkClass}>
          <CheckSquare size={20} />
          Tasks
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <Settings size={20} />
          Settings
        </NavLink>
      </nav>

      {/* User */}

      <div className="border-t border-slate-800 p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-lg font-bold">
            {user?.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="font-semibold">{user?.name}</p>

            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-3 font-medium transition-all duration-300 hover:bg-rose-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}