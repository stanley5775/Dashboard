import {
  CheckCircle2,
  Clock3,
  FolderKanban,
  ListTodo,
  TrendingUp,
} from "lucide-react";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";

export default function StatsGrid() {
  const { tasks } = useTasks();

  const { projects } = useProjects();

  const totalProjects = projects.length;

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed",
  ).length;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: FolderKanban,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      valueColor: "text-slate-800",
    },
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ListTodo,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-slate-800",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      valueColor: "text-green-600",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: Clock3,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      valueColor: "text-orange-600",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      valueColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className={`mt-2 text-3xl font-bold ${stat.valueColor}`}>
                  {stat.value}
                </p>
              </div>

              <div
                className={`rounded-2xl p-3 ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon size={22} className={stat.iconColor} />
              </div>
            </div>

            {/* Completion progress */}
            {stat.title === "Completion Rate" && (
              <div className="mt-5">
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-700"
                    style={{
                      width: `${completionRate}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
