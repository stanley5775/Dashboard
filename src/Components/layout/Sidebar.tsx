import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  CheckSquare,
  LogOut,
  X
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleNavClick() {
    onClose();
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <>
      {/* mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Logo */}

        <div className="flex items-start justify-between border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-xl">
              D
            </div>

            <div>
              <h2 className="text-lg text-font-bold text-white lg:text-xl">Project</h2>

              <p className="text-sm text-slate-400">Management Dashboard</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white hover:bg-slate-800 lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 p-4">
          <NavLink to="/" className={linkClass} onClick={handleNavClick}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/analytics"
            className={linkClass}
            onClick={handleNavClick}
          >
            <BarChart3 size={20} />
            Analytics
          </NavLink>

          <NavLink
            to="/projects"
            className={linkClass}
            onClick={handleNavClick}
          >
            <FolderKanban size={20} />
            Projects
          </NavLink>

          <NavLink to="/tasks" className={linkClass} onClick={handleNavClick}>
            <CheckSquare size={20} />
            Tasks
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
    </>
  );
}