import { Plus, Search } from "lucide-react";
import TaskCard from "../../components/tasks/TaskCard";
import TaskForm from "../../components/tasks/TaskForm";
import { useEffect, useState } from "react";
import type { Task } from "../../types/task"
import type { Project } from "../../types/project";
import DeleteTaskModal from "../../components/tasks/DeleteTaskModal";

export default function Tasks() {

  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  useEffect(() => {
    const savedTasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");

    setTasks(savedTasks);
    setProjects(savedProjects);
  }, [])

function handleSave(task: Task) {
  let updated: Task[];

  const exists = tasks.some((t) => t.id === task.id);

  if (exists) {
    updated = tasks.map((t) => (t.id === task.id ? task : t));
  } else {
    updated = [...tasks, task];
  }

  setTasks(updated);

  localStorage.setItem("tasks", JSON.stringify(updated));

  setEditingTask(null);
  setShowModal(false);
  }
  
  function handleDelete() {
    if (!deletingTask) return;

    const updated = tasks.filter((task) => task.id !== deletingTask.id);

    setTasks(updated);

    localStorage.setItem("tasks", JSON.stringify(updated));

    setDeletingTask(null);
  }

  function handleStatusChange(taskId: string, status: Task["status"]) {
    const updated = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task,
    );

    setTasks(updated);

    localStorage.setItem("tasks", JSON.stringify(updated));
  }

  return (
    <div className="page p-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1>Task Management</h1>

          <p className="mt-2 text-slate-500">
            Create, assign and manage tasks across all your projects.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      {/* Search + Filter */}

      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11"
          />
        </div>

        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="rounded-xl border border-slate-300 p-3"
        >
          <option value="">All Projects</option>

          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Task Cards */}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {tasks.length === 0 ? (
          <div className="col-span-full rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
            <h3 className="text-xl font-semibold">No Tasks Yet</h3>

            <p className="mt-2 text-slate-500">
              Create your first task to get started.
            </p>
          </div>
        ) : (
          tasks
            .filter((task) => {
              const matchesSearch = task.title
                .toLowerCase()
                .includes(search.toLowerCase());

              const matchesProject =
                !selectedProject || task.projectId === selectedProject;

              return matchesSearch && matchesProject;
            })
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => {
                  setEditingTask(task);
                  setShowModal(true);
                }}
                onDelete={() => setDeletingTask(task)}
                onStatusChange={(status) =>
                  handleStatusChange(task.id, status)
                }
              />
            ))
        )}
      </div>

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
