import { CalendarDays, Pencil, Trash2, Eye } from "lucide-react";

export default function ProjectCard() {
  return (
    <div className="card hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
      {/* Header */}

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">Website Redesign</h3>

          <p className="mt-2">
            Redesign the company website with a modern responsive interface.
          </p>
        </div>

        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
          In Progress
        </span>
      </div>

      {/* Progress */}

      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm">Progress</span>

          <span className="text-sm font-semibold">75%</span>
        </div>

        <div className="h-3 rounded-full bg-slate-200">
          <div className="h-3 w-3/4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />
          Aug 25, 2026
        </div>

        <div className="flex gap-2">
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
    </div>
  );
}
