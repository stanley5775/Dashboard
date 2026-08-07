import { createContext, useContext, useEffect, useState } from "react";

import type { Task } from "../types/task";
import { useAuth } from "./AuthContext";

interface TaskContextType {
  tasks: Task[];

  addTask: (task: Task) => void;

  updateTask: (task: Task) => void;

  deleteTask: (id: string) => void;

  updateTaskStatus: (id: string, status: Task["status"]) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);

  /*
   * Load tasks whenever the logged-in user changes.
   */
  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const taskKey = `tasks_${user.email}`;

    const savedTasks = localStorage.getItem(taskKey);

    if (!savedTasks) {
      setTasks([]);
      return;
    }

    try {
      setTasks(JSON.parse(savedTasks));
    } catch (error) {
      console.error("Failed to load tasks:", error);

      setTasks([]);
    }
  }, [user]);

  /*
   * Save tasks for the CURRENT user.
   */
  useEffect(() => {
    if (!user) return;

    const taskKey = `tasks_${user.email}`;

    localStorage.setItem(taskKey, JSON.stringify(tasks));
  }, [tasks, user]);

  /*
   * Add task
   */
  function addTask(task: Task) {
    setTasks((prevTasks) => [...prevTasks, task]);
  }

  /*
   * Update task
   */
  function updateTask(task: Task) {
    setTasks((prevTasks) =>
      prevTasks.map((existingTask) =>
        existingTask.id === task.id ? task : existingTask,
      ),
    );
  }

  /*
   * Delete task
   */
  function deleteTask(id: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  /*
   * Change task status
   */
  function updateTaskStatus(id: string, status: Task["status"]) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
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
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
}
