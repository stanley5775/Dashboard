import { AlertTriangle } from "lucide-react";
import type { Project } from "../../types/project";

interface DeleteProjectModalProps {
  project: Project;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteProjectModal({
  project,
  onClose,
  onConfirm,
}: DeleteProjectModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <AlertTriangle size={40} className="text-red-500" />
          </div>
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold">Delete Project</h2>

        <p className="mt-4 text-center text-slate-600">
          Are you sure you want to delete
        </p>

        <p className="mt-2 text-center font-semibold">"{project.name}"</p>

        <p className="mt-2 text-center text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex gap-4">
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
