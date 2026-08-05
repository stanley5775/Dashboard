import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-12">
      <Inbox size={60} className="text-slate-400" />

      <h2 className="mt-4 text-2xl font-bold">{title}</h2>

      <p className="mt-2 text-center text-slate-500">{description}</p>
    </div>
  );
}
