import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectForm from "../../components/projects/ProjectForm";
import type { Project } from "../../types/project";
import DeleteProjectModal from "../../components/projects/DeleteProjectmodal";

export default function Projects() {

  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("projects") || "[]");
    
    setProjects(saved);
  }, []);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  function handleDelete() {
    if (!deletingProject) return;

    const updated = projects.filter(
      (project) => project.id !== deletingProject.id,
    );

    setProjects(updated);

    localStorage.setItem("projects", JSON.stringify(updated));

    setDeletingProject(null);
  }

function handleSave(project: Project) {
  let updated: Project[];

  const exists = projects.some((p) => p.id === project.id);

  if (exists) {
    updated = projects.map((p) => (p.id === project.id ? project : p));
  } else {
    updated = [...projects, project];
  }

  setProjects(updated);

  localStorage.setItem("projects", JSON.stringify(updated));

  setEditingProject(null);

  setShowModal(false);
}

  return (
    <>
      <div className="page p-6">
        {/* Header */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1>Projects</h1>

            <p className="mt-2">Manage and monitor all your projects.</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
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
          {projects.length === 0 ? (
            <div className="col-span-full rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
              <h3>No projects yet</h3>
              <p>Create your first project.</p>
            </div>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => {
                  setEditingProject(project);
                  setShowModal(true);
                }}
                onDelete={() => setDeletingProject(project)}
              />
            ))
          )}
        </div>
      </div>

      {showModal && (
        <ProjectForm
          project={editingProject || undefined}
          onClose={() => {
            setShowModal(false);
            setEditingProject(null);
          }}
          onSave={handleSave}
        />
      )}

      {deletingProject && (
        <DeleteProjectModal
          project={deletingProject}
          onClose={() => setDeletingProject(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
