import UserCard from "./UserCard";
import type { User } from "../../types/user";

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
