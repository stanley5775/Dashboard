import { Plus, Search } from "lucide-react";
import TaskCard from "../../components/tasks/TaskCard";
import TaskForm from "../../components/tasks/TaskForm";
import { useEffect, useState } from "react";
import type { Task } from "../../types/task"

export default function Tasks() {

  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

    setTasks(savedTasks);
  }, [])

  function handleSave(task: Task) {
    const updated = [...tasks, task];

    setTasks(updated);

    localStorage.setItem("tasks", JSON.stringify(updated)
    );
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

          <input placeholder="Search tasks..." className="pl-11" />
        </div>

        <select className="rounded-xl border border-slate-300 bg-white px-4 py-3">
          <option>All Projects</option>
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
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>

      {showModal && (
        <TaskForm onClose={() => setShowModal(false)}
        onSave={handleSave} />
      )}

    </div>

  );
}
