import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatsGrid from "../../components/dashboard/StatsGrid";
import ChartSection from "../../components/dashboard/ChartSection";
import RecentProjects from "../../components/dashboard/RecentProjects";
import RecentTasks from "../../components/dashboard/RecentTasks";
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
