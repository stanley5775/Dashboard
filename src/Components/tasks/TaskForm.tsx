import { useEffect, useState } from "react";
import type { Task } from "../../types/task";
import type { Project } from "../../types/project";

interface TaskFormProps {
  onClose: () => void;
    onSave: (task: Task) => void;
    task?: Task;
}

export default function TaskForm({
  onClose,
    onSave,
  task,
}: TaskFormProps) {
  const [projects, setProjects] = useState<Project[]>([]);

const [form, setForm] = useState({
  projectId: task?.projectId || "",
  title: task?.title || "",
  description: task?.description || "",
  priority: task?.priority || "Medium",
  assignedUser: task?.assignedUser || "",
  dueDate: task?.dueDate || "",
  status: task?.status || "Todo",
});

  useEffect(() => {
    const savedProjects: Project[] = JSON.parse(
      localStorage.getItem("projects") || "[]"
    );

    setProjects(savedProjects);

    if (savedProjects.length > 0) {
      setForm((prev) => ({
        ...prev,
        projectId: savedProjects[0].id,
      }));
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSave({
      id: task?.id || crypto.randomUUID(),
      ...form,
      createdAt: task?.createdAt || new Date().toLocaleDateString(),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6">
              <h2 className="mb-6 text-2xl font-bold">{task ? "Edit Task" : "Create Task" }</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <select
            value={form.projectId}
            onChange={(e) =>
              setForm({
                ...form,
                projectId: e.target.value,
              })
            }
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Task title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <textarea
            rows={4}
            placeholder="Description"
            className="w-full rounded-xl border border-slate-300 p-3"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <select
            value={form.priority}
            onChange={(e) =>
              setForm({
                ...form,
                priority: e.target.value as Task["priority"],
              })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            placeholder="Assigned User"
            value={form.assignedUser}
            onChange={(e) =>
              setForm({
                ...form,
                assignedUser: e.target.value,
              })
            }
          />

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
              setForm({
                ...form,
                dueDate: e.target.value,
              })
            }
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as Task["status"],
              })
            }
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <div className="flex justify-end gap-3">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn-primary">
              {task ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}