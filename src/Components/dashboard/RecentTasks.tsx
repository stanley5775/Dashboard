import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Plus,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";

export default function RecentTasks() {
  const { tasks } = useTasks();

  
  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  /*
   * Priority colors
   */
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-600 ring-red-100";

      case "Medium":
        return "bg-amber-50 text-amber-600 ring-amber-100";

      case "Low":
        return "bg-emerald-50 text-emerald-600 ring-emerald-100";

      default:
        return "bg-slate-50 text-slate-600 ring-slate-100";
    }
  };

  /*
   * Status colors
   */
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-600 ring-green-100";

      case "In Progress":
        return "bg-blue-50 text-blue-600 ring-blue-100";

      case "Todo":
        return "bg-slate-50 text-slate-600 ring-slate-100";

      default:
        return "bg-slate-50 text-slate-600 ring-slate-100";
    }
  };

  /*
   * Status icon
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 size={14} />;

      case "In Progress":
        return <Clock3 size={14} />;

      default:
        return <ClipboardList size={14} />;
    }
  };

  /*
   * Check if task is overdue.
   */
  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== "Completed";
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
              <ClipboardList size={20} />
            </div>

            <h2 className="text-xl font-bold text-slate-800">Recent Tasks</h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Your latest tasks and their current status.
          </p>
        </div>

        <Link
          to="/tasks"
          className="inline-flex w-fit items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-indigo-600 transition-all duration-200 hover:bg-indigo-50"
        >
          View All
          <ArrowRight size={17} />
        </Link>
      </div>

      {/* Empty State */}
      {recentTasks.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 px-5 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
            <ClipboardList size={30} />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-800">
            No tasks yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Create your first task to start tracking your work.
          </p>

          <Link
            to="/tasks"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
          >
            <Plus size={18} />
            Create Task
          </Link>
        </div>
      ) : (
        /* Task List */
        <div className="mt-6 space-y-4">
          {recentTasks.map((task) => {
            const overdue = isOverdue(task.dueDate, task.status);

            return (
              <div
                key={task.id}
                className="group rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-5"
              >
                {/* Title + Priority */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-slate-800 sm:text-lg">
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <span
                    className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getPriorityStyle(
                      task.priority,
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>

                {/* Status + User */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getStatusStyle(
                      task.status,
                    )}`}
                  >
                    {getStatusIcon(task.status)}
                    {task.status}
                  </span>

                  {task.assignedUser && (
                    <span className="inline-flex max-w-full items-center gap-1.5 truncate rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-100">
                      <UserRound size={14} />

                      <span className="truncate">{task.assignedUser}</span>
                    </span>
                  )}
                </div>

                {/* Due Date */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                  <div
                    className={`flex items-center gap-2 ${
                      overdue ? "font-semibold text-red-600" : "text-slate-400"
                    }`}
                  >
                    <CalendarDays size={16} />

                    <span>
                      Due{" "}
                      {new Date(task.dueDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {overdue && (
                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                      Overdue
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
