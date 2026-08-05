import { TriangleAlert } from "lucide-react";

interface ErrorStateProps {
  message: string;
  retry: () => void;
}

export default function ErrorState({ message, retry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-red-50 p-10">
      <TriangleAlert size={55} className="text-red-500" />

      <h2 className="mt-4 text-2xl font-bold">Something went wrong</h2>

      <p className="mt-2 text-center text-red-600">{message}</p>

      <button onClick={retry} className="btn-primary mt-6">
        Retry
      </button>
    </div>
  );
}
