import { ArrowRight, CalendarDays, FolderKanban, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";


export default function RecentProjects() {
  const { projects } = useProjects();

  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  /*
   * Make sure progress is always between 0 and 100.
   */
  const getProgress = (progress?: number) => {
    if (typeof progress !== "number") return 0;

    return Math.min(100, Math.max(0, progress));
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600">
              <FolderKanban size={20} />
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Recent Projects
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Your most recently created projects.
          </p>
        </div>

        <Link
          to="/projects"
          className="inline-flex w-fit items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-indigo-600 transition-all duration-200 hover:bg-indigo-50"
        >
          View All
          <ArrowRight size={17} />
        </Link>
      </div>

      {/* Empty State */}
      {recentProjects.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 px-5 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
            <FolderKanban size={30} />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-800">
            No projects yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Create your first project and start organizing your work.
          </p>

          <Link
            to="/projects"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
          >
            <Plus size={18} />
            Create Project
          </Link>
        </div>
      ) : (
        /* Projects */
        <div className="mt-6 space-y-4">
          {recentProjects.map((project) => {
            const progress = getProgress(project.progress);

            return (
              <div
                key={project.id}
                className="group rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-5"
              >
                {/* Project top section */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-slate-800 sm:text-lg">
                      {project.name}
                    </h3>

                    {project.description && (
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* Progress badge */}
                  <span className="w-fit shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                    {progress}%
                  </span>
                </div>

                {/* Date */}
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
                  <CalendarDays size={16} />

                  <span>
                    Created{" "}
                    {new Date(project.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      Progress
                    </span>

                    <span className="text-xs font-semibold text-slate-700">
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-700"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
