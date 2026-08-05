import { CalendarDays, Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../../types/project";

interface ProjectCardProps {
    project: Project;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ProjectCard({
    project,
    onEdit,
    onDelete
}: ProjectCardProps) {

    const navigate = useNavigate();

  return (
    <div className="card hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
      {/* Header */}

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{project.name}</h3>

          <p className="mt-2">
            {project.description}
          </p>
        </div>

        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
            {project.progress}%
        </span>
      </div>

      {/* Progress */}

      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm">{project.status}</span>

                  <span className="text-sm font-semibold">{project.createdAt}</span>
        </div>

        <div className="h-3 rounded-full bg-slate-200">
                  <div
                      style={{ width: `${project.progress}%` }}
                      className="h-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />
          Aug 25, 2026
        </div>

        <div className="flex gap-2">
                  <button
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="rounded-lg p-2 hover:bg-slate-100">
            <Eye size={18} />
          </button>

                  <button
                      onClick={onEdit}
                      className="rounded-lg p-2 hover:bg-slate-100">
            <Pencil size={18} />
          </button>

                  <button
                        onClick={onDelete}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
