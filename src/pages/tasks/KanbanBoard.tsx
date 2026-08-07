import { useState } from "react";

import { DragDropContext } from "@hello-pangea/dnd";

import type { DropResult } from "@hello-pangea/dnd";

import type { Task } from "../../types/task";

import KanbanColumn from "../../Components/tasks/KanbanColumn";

import { useTasks } from "../../context/TaskContext";

export default function KanbanBoard() {
  const { tasks, updateTaskStatus } = useTasks();

  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("");

  const [userFilter, setUserFilter] = useState("");

  const users = [...new Set(tasks.map((task) => task.assignedUser))];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPriority = !priorityFilter || task.priority === priorityFilter;

    const matchesUser = !userFilter || task.assignedUser === userFilter;

    return matchesSearch && matchesPriority && matchesUser;
  });

  const todoTasks = filteredTasks.filter((task) => task.status === "Todo");

  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "In Progress",
  );

  const completedTasks = filteredTasks.filter(
    (task) => task.status === "Completed",
  );

  function handleDragEnd(result: DropResult) {
    const { destination, draggableId } = result;

    if (!destination) return;

    updateTaskStatus(draggableId, destination.droppableId as Task["status"]);
  }

  return (
    <div className="page p-6">
      <h1 className="text-2xl font-bold">Task Board</h1>

      <div className="my-6 flex flex-col gap-4 md:flex-row">
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border p-3 flex-1"
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option value="">All Priorities</option>

          <option value="High">High</option>

          <option value="Medium">Medium</option>

          <option value="Low">Low</option>
        </select>

        <select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option value="">All Users</option>

          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          className="
grid 
gap-6
md:grid-cols-2
xl:grid-cols-3
"
        >
          <KanbanColumn title="Todo" droppableId="Todo" tasks={todoTasks} />

          <KanbanColumn
            title="In Progress"
            droppableId="In Progress"
            tasks={inProgressTasks}
          />

          <KanbanColumn
            title="Completed"
            droppableId="Completed"
            tasks={completedTasks}
          />
        </div>
      </DragDropContext>
    </div>
  );
}
