import { ArrowRight, FolderKanban, ListTodo, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface WelcomeCardProps {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
}

export default function WelcomeCard({
  totalProjects,
  totalTasks,
  completedTasks,
}: WelcomeCardProps) {
  const { user } = useAuth();

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 text-white shadow-xl sm:p-8 lg:p-10">
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-purple-300/10 blur-3xl" />

      <div className="relative z-10">
        {/* Greeting */}
        <div className="flex items-center gap-2 text-indigo-100">
          <Sparkles size={20} />

          <span className="text-sm font-medium sm:text-base">
            Your productivity overview
          </span>
        </div>

        <h1 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Welcome, {user?.name || "there"} 
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
          Keep track of your projects, manage your tasks, and stay on top of
          your work from one place.
        </p>

        {/* Statistics */}
        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-2">
                <FolderKanban size={20} />
              </div>

              <div>
                <p className="text-xs text-indigo-100">Projects</p>

                <p className="text-xl font-bold">{totalProjects}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-2">
                <ListTodo size={20} />
              </div>

              <div>
                <p className="text-xs text-indigo-100">Total Tasks</p>

                <p className="text-xl font-bold">{totalTasks}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-2">
                <Sparkles size={20} />
              </div>

              <div>
                <p className="text-xs text-indigo-100">Completion</p>

                <p className="text-xl font-bold">{completionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-7">
          <Link
            to="/tasks"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-50 hover:shadow-xl sm:w-auto"
          >
            View Tasks
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
