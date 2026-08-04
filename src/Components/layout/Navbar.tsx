import { Bell, Search, Menu, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Left */}

        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="relative hidden md:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input type="text" placeholder="Search..." className="w-72 pl-10" />
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-5">
          {/* Notification */}

          <button className="relative rounded-full p-2 hover:bg-slate-100">
            <Bell size={22} />

            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User */}

          <button className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-slate-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-white">
              {user?.name.charAt(0).toUpperCase()}
            </div>

            <div className="hidden text-left md:block">
              <p className="font-semibold text-slate-900">{user?.name}</p>

              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>

            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
