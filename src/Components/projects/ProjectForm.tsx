import { useState } from "react";

interface ProjectFormProps {
  onClose: () => void;
  onSave: (project: any) => void;
}

export default function ProjectForm({ onClose, onSave }: ProjectFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    progress: 0,
    dueDate: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSave({
      id: crypto.randomUUID(),
      ...form,
      createdAt: new Date().toLocaleDateString(),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold">Create Project</h2>

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
                  status: e.target.value,
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
                  priority: e.target.value,
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
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
