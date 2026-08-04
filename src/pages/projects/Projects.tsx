import { Plus, Search } from "lucide-react";
import ProjectCard from "../../components/projects/ProjectCard";

export default function Projects() {
  return (
    <div className="page p-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1>Projects</h1>

          <p className="mt-2">Manage and monitor all your projects.</p>
        </div>

        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Search */}

      <div className="relative mt-8 max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input placeholder="Search projects..." className="pl-11" />
      </div>

      {/* Cards */}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
}
