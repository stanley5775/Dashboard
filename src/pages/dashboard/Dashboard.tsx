import WelcomeCard from "../../Components/dashboard/WelcomeCard";
import StatsGrid from "../../Components/dashboard/StatsGrid";
import ChartSection from "../../Components/dashboard/ChartSection";
import RecentProjects from "../../Components/dashboard/RecentProjects";
import RecentTasks from "../../Components/dashboard/RecentTasks";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";

export default function Dashboard() {
  const { tasks } = useTasks();

  const { projects } = useProjects();

  const totalProjects = projects.length;

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  return (
    <div className="space-y-6 pb-10 sm:space-y-8">
      {/* Welcome */}
      <WelcomeCard
        totalProjects={totalProjects}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />

      {/* Statistics */}
      <StatsGrid />

      {/* Analytics */}
      <ChartSection />

      {/* Recent Data */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentProjects />
        <RecentTasks />
      </div>
    </div>
  );
}
