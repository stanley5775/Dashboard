import {
  CalendarDays,
  Pencil,
  Trash2,
  Eye,
  FolderKanban,
  User,
} from "lucide-react";
import type { Task } from "../../types/task"

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({
  task,
}: TaskCardProps) {
  return (
    <div className="card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{task.title}</h3>

          <p className="mt-2 text-slate-600">
            {task.description}
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {task.status}
        </span>
      </div>

      {/* Information */}

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FolderKanban size={16} />
          {task.projectId}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <User size={16} />
          {task.assignedUser}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={16} />
          {task.dueDate}
        </div>

        <div>
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
            {task.priority}
          </span>
        </div>
      </div>

      {/* Actions */}

      <div className="mt-6 flex justify-end gap-2">
        <button className="rounded-lg p-2 hover:bg-slate-100">
          <Eye size={18} />
        </button>

        <button className="rounded-lg p-2 hover:bg-slate-100">
          <Pencil size={18} />
        </button>

        <button className="rounded-lg p-2 text-red-500 hover:bg-red-50">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
