import { LoaderCircle } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <LoaderCircle size={45} className="animate-spin text-indigo-600" />
      <p className="mt-4 text-slate-500 animate-bounce">
        Loading users...
      </p>
    </div>
  );
}
