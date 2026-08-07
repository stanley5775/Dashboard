import { useParams, useNavigate } from "react-router-dom";
import { CalendarDays, Flag, ArrowLeft, BarChart3 } from "lucide-react";

import { useProjects } from "../../context/ProjectContext";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { projects } = useProjects();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="page flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Project not found.</h2>

          <button
            onClick={() => navigate("/projects")}
            className="mt-4 text-indigo-600 hover:underline"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page p-6">
      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-indigo-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Projects
      </button>

      {/* Header */}

      <div className="card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1>{project.name}</h1>

            <p className="mt-3">{project.description}</p>
          </div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 font-medium text-indigo-700">
            {project.status}
          </span>
        </div>
      </div>

      {/* Information */}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="mb-4">Progress</h3>

          <div className="h-4 rounded-full bg-slate-200">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
              style={{
                width: `${project.progress}%`,
              }}
            />
          </div>

          <p className="mt-3 font-semibold">{project.progress}%</p>
        </div>

        <div className="card space-y-5">
          <div className="flex items-center gap-3">
            <Flag className="text-indigo-600" />

            <div>
              <p className="text-sm text-slate-500">Priority</p>

              <p className="font-semibold">{project.priority}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="text-indigo-600" />

            <div>
              <p className="text-sm text-slate-500">Due Date</p>

              <p className="font-semibold">{project.dueDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BarChart3 className="text-indigo-600" />

            <div>
              <p className="text-sm text-slate-500">Created</p>

              <p className="font-semibold">{project.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
