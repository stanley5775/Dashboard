import { Draggable, Droppable } from "@hello-pangea/dnd";

import TaskCard from "./TaskCard";

import type { Task } from "../../types/task";

interface Props {
  title: string;

  tasks: Task[];

  droppableId: string;
}

export default function KanbanColumn({ title, tasks, droppableId }: Props) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`
min-h-[500px]
rounded-2xl
border
p-4
transition

${
  snapshot.isDraggingOver
    ? "bg-blue-50 border-blue-400"
    : "bg-slate-50 border-slate-200"
}

`}
        >
          <div
            className="
mb-5
flex
justify-between
"
          >
            <h2
              className="
font-bold
text-lg
"
            >
              {title}
            </h2>

            <span
              className="
rounded-full
bg-white
px-3
py-1
shadow
"
            >
              {tasks.length}
            </span>
          </div>

          <div
            className="
max-h-[600px]
space-y-4
overflow-y-auto
"
          >
            {tasks.length === 0 ? (
              <div
                className="
rounded-xl
border-2
border-dashed
p-8
text-center
"
              >
                No tasks
              </div>
            ) : (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="transition"
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))
            )}

            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
