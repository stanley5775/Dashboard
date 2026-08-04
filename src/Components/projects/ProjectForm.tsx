import { useState } from "react";
import type { Project } from "../../types/project";

interface ProjectFormProps {
  onClose: () => void;
    onSave: (project: Project) => void;
    project?: Project;
}

export default function ProjectForm({ onClose, onSave, project }: ProjectFormProps) {
const [form, setForm] = useState({
  name: project?.name || "",
  description: project?.description || "",
  status: project?.status || "Planning",
  priority: project?.priority || "Medium",
  progress: project?.progress || 0,
  dueDate: project?.dueDate || "",
});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSave({
      id: project?.id || crypto.randomUUID(),
      ...form,
        createdAt:
            project?.createdAt || new Date().toLocaleDateString(),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold">
          {project ? "Edit Project" : "Create Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            placeholder="Project Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <textarea
            rows={4}
            placeholder="Project Description"
            className="w-full rounded-xl border border-slate-300 p-4"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <div className="grid gap-4 md:grid-cols-2">
            <select
              className="rounded-xl border border-slate-300 p-3"
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as "Planning" | "In Progress" | "Completed",
                })
              }
            >
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <select
              className="rounded-xl border border-slate-300 p-3"
              value={form.priority}
              onChange={(e) =>
                setForm({
                  ...form,
                  priority: e.target.value as "Low" | "Medium" | "High",
                })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option> 
            </select>
          </div>

          <div>
            <label className="mb-2 block">Progress</label>

            <input
              type="range"
              min={0}
              max={100}
              value={form.progress}
              onChange={(e) =>
                setForm({
                  ...form,
                  progress: Number(e.target.value),
                })
              }
            />

            <p>{form.progress}%</p>
          </div>

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

          <div className="flex justify-end gap-3">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn-primary">
                {project ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
