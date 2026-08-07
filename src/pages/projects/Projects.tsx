import { Plus, Search } from "lucide-react";
import { useState } from "react";

import ProjectCard from "../../Components/projects/ProjectCard";
import ProjectForm from "../../Components/projects/ProjectForm";
import DeleteProjectModal from "../../Components/projects/DeleteProjectmodal";

import type { Project } from "../../types/project";

import { useProjects } from "../../context/ProjectContext";

export default function Projects() {
  /*
   * Get project data and actions
   * from ProjectContext.
   */
  const { projects, addProject, updateProject, deleteProject } = useProjects();

  /*
   * UI state.
   */
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  /*
   * Create or update project.
   */
  function handleSave(project: Project) {
    /*
     * Check whether this project already exists.
     */
    const exists = projects.some(
      (existingProject) => existingProject.id === project.id,
    );

    if (exists) {
      /*
       * Update existing project.
       */
      updateProject(project);
    } else {
      /*
       * Create new project.
       */
      addProject(project);
    }

    /*
     * Close modal.
     */
    setEditingProject(null);
    setShowModal(false);
  }

  /*
   * Delete project.
   */
  function handleDelete() {
    if (!deletingProject) {
      return;
    }

    deleteProject(deletingProject.id);

    setDeletingProject(null);
  }

  /*
   * Search projects.
   */
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="page min-h-full p-4 sm:p-6">
      {/* =================================
          HEADER
      ================================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1>Projects</h1>

          <p className="mt-2">Manage and monitor all your projects.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingProject(null);
            setShowModal(true);
          }}
          className="btn-primary flex w-full items-center justify-center gap-2 md:w-auto"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* search */}

      <div className="relative mt-6 w-full max-w-md sm:mt-8">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11"
        />
      </div>

      {/* project card */}

      <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.length === 0 ? (
          /*
           * Empty state.
           */
          <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center sm:p-12">
            <h3 className="text-lg font-semibold text-slate-800">
              {projects.length === 0 ? "No projects yet" : "No projects found"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {projects.length === 0
                ? "Create your first project to get started."
                : "Try a different search term."}
            </p>

            {projects.length === 0 && (
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setShowModal(true);
                }}
                className="btn-primary mt-5 inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Create Project
              </button>
            )}
          </div>
        ) : (
          /*
           * Display projects.
           */
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => {
                setEditingProject(project);
                setShowModal(true);
              }}
              onDelete={() => {
                setDeletingProject(project);
              }}
            />
          ))
        )}
      </div>

      {/* =================================
          CREATE / EDIT MODAL
      ================================== */}

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
          onClose={() => {
            setDeletingProject(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
