import { createContext, useContext, useEffect, useState } from "react";

import type { Task } from "../types/task";

interface TaskContextType {
  tasks: Task[];

  addTask: (task: Task) => void;

  updateTask: (task: Task) => void;

  deleteTask: (id: string) => void;

  updateTaskStatus: (id: string, status: Task["status"]) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  /*
Load tasks once
*/

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");

    setTasks(saved);
  }, []);

  /*
Save whenever tasks changes
*/

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task: Task) {
    setTasks((prev) => [...prev, task]);
  }

  function updateTask(task: Task) {
    setTasks((prev) => prev.map((item) => (item.id === task.id ? task : item)));
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function updateTaskStatus(id: string, status: Task["status"]) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
            }
          : task,
      ),
    );
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        updateTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(" useTasks must be used inside TaskProvider");
  }

  return context;
}
