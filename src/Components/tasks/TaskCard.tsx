import {
  CalendarDays,
  Pencil,
  Trash2,
  Eye,
  FolderKanban,
  User,
} from "lucide-react";

export default function TaskCard() {
  return (
    <div className="card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">Design Login Screen</h3>

          <p className="mt-2 text-slate-600">
            Create a modern login interface using React and Tailwind CSS.
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          Todo
        </span>
      </div>

      {/* Information */}

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FolderKanban size={16} />
          Website Redesign
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <User size={16} />
          Stanley
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={16} />
          15 Aug 2026
        </div>

        <div>
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
            High Priority
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
