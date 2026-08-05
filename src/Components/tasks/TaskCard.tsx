import {
  CalendarDays,
  Pencil,
  Trash2,
  Eye,
  FolderKanban,
  User,
} from "lucide-react";
import type { Task } from "../../types/task"
import type { Project } from "../../types/project"
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onStatusChange?: (status: Task["status"]) => void
}

export default function TaskCard({
  task, onEdit, onDelete, onView, onStatusChange,
}: TaskCardProps) {

  const projects: Project[] = JSON.parse(
    localStorage.getItem("projects") || "[]"
  );

  const project = projects.find((p) => p.id === task.projectId);
  const navigate = useNavigate();

  function priorityColor() {
    switch (task.priority) {
      case "High": return "bg-red-100 text-red-600";
      case "Medium": return "bg-yellow-100 text-yellow-600";

      default: return "bg-green-100 text-green-600";
    }
  }

  function statusColor() {
    switch (task.status) {
      case "Completed": return "bg-green-100 text-green-600";
      case "In Progress": return "bg-blue-100 text-blue-600";

      default:
        return "bg-slate-200 text-slate-700"
    }
  }
  return (
    <div className="card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{task.title}</h3>

          <p className="mt-2 text-slate-600">{task.description}</p>
        </div>

        <select
          value={task.status}
          onChange={(e) => onStatusChange?.(e.target.value as Task["status"])}
          className={`rounded-full px-3 py-2 text-sm font-semibold border-0 cursor-pointer ${statusColor()}`}
        >
          <option value="Todo">Todo</option>

          <option value="In Progress">In Progress</option>

          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Information */}

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FolderKanban size={16} />
          {project?.name || "Unknown Project"}
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
        <button onClick={() =>
          navigate(`/tasks/${task.id}`)
        } className="rounded-lg p-2 hover:bg-slate-100">
          <Eye size={18} />
        </button>

        <button onClick={onEdit} className="rounded-lg p-2 hover:bg-slate-100">
          <Pencil size={18} />
        </button>

        <button
          onClick={onDelete}
          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
