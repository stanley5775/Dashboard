import { Mail, Building2 } from "lucide-react";
import type { User } from "../../types/user";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="mx-auto w-full max-w-md card transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex  flex-col items-center gap-4 text-center sm:flex-row sm:item-start sm:text-left">
        <img
          src={user.image}
          alt={user.firstName}
          className="h-16 w-16 rounded-full border-4 border-indigo-100 sm:h-20 sm:w-20"
        />

        <div>
          <h2 className="text-xl font-bold">
            {user.firstName} {user.lastName}
          </h2>

          <div className="mt-2 flex w-full items-center gap-2 text-slate-600">
            <Mail size={16} />
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>

          <div className="mt-2 flex items-center gap-2 text-slate-600">
            <Building2 size={16} />
            {user.company.name}
          </div>

          <p className="mt-2 text-sm text-indigo-600">{user.company.title}</p>
        </div>
      </div>
    </div>
  );
}
