import { Plus, Search } from "lucide-react";
import { useState } from "react";

import TaskCard from "../../Components/tasks/TaskCard";
import TaskForm from "../../Components/tasks/TaskForm";
import DeleteTaskModal from "../../Components/tasks/DeleteTaskModal";

import type { Task } from "../../types/task";

import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";

export default function Tasks() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const { tasks, addTask, updateTask, deleteTask, updateTaskStatus } =
    useTasks();

  const { projects } = useProjects();

  function handleSave(task: Task) {
    const exists = tasks.some((t) => t.id === task.id);

    if (exists) {
      updateTask(task);
    } else {
      addTask(task);
    }

    setEditingTask(null);
    setShowModal(false);
  }

  function handleDelete() {
    if (!deletingTask) return;

    deleteTask(deletingTask.id);
    setDeletingTask(null);
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesProject =
      !selectedProject || task.projectId === selectedProject;

    return matchesSearch && matchesProject;
  });

  return (
    <div className="page min-w-0 p-4 sm:p-6">
      {/* Header */}
      <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold sm:text-3xl">Task Management</h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Create, assign and manage tasks across all your projects.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
          className="btn-primary flex w-full shrink-0 items-center justify-center gap-2 md:w-auto"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      {/* Search + Filter */}
      <div className="mt-6 flex min-w-0 flex-col gap-3 sm:mt-8 md:flex-row">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full min-w-0 rounded-xl border border-slate-300 p-3 pl-11 outline-none focus:border-indigo-500"
          />
        </div>

        {/* Project Filter */}
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full min-w-0 rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-indigo-500 md:w-56 md:shrink-0"
        >
          <option value="">All Projects</option>

          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Task Count */}
      <div className="mt-6">
        <p className="text-sm text-slate-500">
          {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
        </p>
      </div>

      {/* Tasks */}
      <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full min-w-0 rounded-xl border-2 border-dashed border-slate-300 p-8 text-center sm:p-12">
            <h3 className="text-lg font-semibold sm:text-xl">No Tasks Yet</h3>

            <p className="mt-2 text-sm text-slate-500">
              {search || selectedProject
                ? "No tasks match your current filters."
                : "Create your first task to get started."}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="min-w-0">
              <TaskCard
                task={task}
                onEdit={() => {
                  setEditingTask(task);
                  setShowModal(true);
                }}
                onDelete={() => setDeletingTask(task)}
                onStatusChange={(status) => updateTaskStatus(task.id, status)}
              />
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Task Modal */}
      {showModal && (
        <TaskForm
          task={editingTask || undefined}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Delete Modal */}
      {deletingTask && (
        <DeleteTaskModal
          task={deletingTask}
          onClose={() => setDeletingTask(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
