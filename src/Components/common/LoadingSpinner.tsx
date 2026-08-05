import { LoaderCircle } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <LoaderCircle size={40} className="animate-spin text-indigo-600" />
    </div>
  );
}
