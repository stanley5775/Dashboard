import { useTasks } from "../../context/TaskContext";
import TaskCompletionChart from "./TaskCompletionChart";

export default function ChartSection() {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed",
  ).length;

  return (
    <section className="w-full">
      <TaskCompletionChart completed={completedTasks} pending={pendingTasks} />
    </section>
  );
}
