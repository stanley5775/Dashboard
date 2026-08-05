import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  FolderKanban,
  User,
  Flag,
  ClipboardCheck,
} from "lucide-react";

import type { Task } from "../../types/task";
import type { Project } from "../../types/project";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

  const projects: Project[] = JSON.parse(
    localStorage.getItem("projects") || "[]",
  );

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="page flex items-center justify-center">
        <h2 className="text-2xl font-bold">Task not found</h2>
      </div>
    );
  }

  const project = projects.find((p) => p.id === task.projectId);

  function priorityColor() {
    if (!task) return "bg-green-100 text-green-600";

    switch (task.priority) {
      case "High":
        return "bg-red-100 text-red-600";

      case "Medium":
        return "bg-yellow-100 text-yellow-600";

      default:
        return "bg-green-100 text-green-600";
    }
  }

  function statusColor() {
    if (!task) return "bg-slate-200 text-slate-700";

    switch (task.status) {
      case "Completed":
        return "bg-green-100 text-green-600";

      case "In Progress":
        return "bg-blue-100 text-blue-600";

      default:
        return "bg-slate-200 text-slate-700";
    }
  }

  return (
    <div className="page p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-indigo-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Tasks
      </button>

      <div className="card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1>{task.title}</h1>

            <p className="mt-3 text-slate-600">{task.description}</p>
          </div>

          <span
            className={`rounded-full px-4 py-2 font-semibold ${statusColor()}`}
          >
            {task.status}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card space-y-6">
          <div className="flex items-center gap-3">
            <FolderKanban className="text-indigo-600" />

            <div>
              <p className="text-sm text-slate-500">Project</p>

              <p className="font-semibold">{project?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="text-indigo-600" />

            <div>
              <p className="text-sm text-slate-500">Assigned User</p>

              <p className="font-semibold">{task.assignedUser}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="text-indigo-600" />

            <div>
              <p className="text-sm text-slate-500">Due Date</p>

              <p className="font-semibold">{task.dueDate}</p>
            </div>
          </div>
        </div>

        <div className="card space-y-6">
          <div className="flex items-center gap-3">
            <Flag className="text-indigo-600" />

            <div>
              <p className="text-sm text-slate-500">Priority</p>

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${priorityColor()}`}
              >
                {task.priority}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ClipboardCheck className="text-indigo-600" />

            <div>
              <p className="text-sm text-slate-500">Created</p>

              <p className="font-semibold">{task.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
