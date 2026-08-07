import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { BarChart3 } from "lucide-react";

interface TaskCompletionChartProps {
  completed: number;
  pending: number;
}

const COLORS = ["#22c55e", "#f59e0b"];

export default function TaskCompletionChart({
  completed,
  pending,
}: TaskCompletionChartProps) {
  const total = completed + pending;

  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const data = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Pending",
      value: pending,
    },
  ];

  if (total === 0) {
    return (
      <div className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-md sm:p-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-3xl">
          <BarChart3 size={40} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-800">
          No task data yet
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Create some tasks to see your completion analytics here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-md sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
            Task Completion
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Overview of your completed and pending tasks.
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-center">
          <p className="text-xs font-medium text-slate-500">Completion Rate</p>

          <p className="text-2xl font-bold text-indigo-600">
            {completionRate}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full sm:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="75%"
              paddingAngle={4}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} stroke="none" />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [value, "Tasks"]}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />

            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-xs font-medium text-green-600">Completed</p>

          <p className="mt-1 text-2xl font-bold text-green-700">{completed}</p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-4">
          <p className="text-xs font-medium text-orange-600">Pending</p>

          <p className="mt-1 text-2xl font-bold text-orange-700">{pending}</p>
        </div>
      </div>
    </div>
  );
}
