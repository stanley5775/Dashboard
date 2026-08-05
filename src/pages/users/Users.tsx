import { Search } from "lucide-react";
import { useUsers } from "../../hooks/useUsers";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import UserList from "../../components/users/UserList";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import { useState } from "react";


export default function Users() {
    const { users, loading, error, retry } = useUsers();
    const [search, setSearch] = useState("")

    const filteredUsers = users.filter(
      (user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );

  if (loading) {
    return <LoadingSpinner />;
  }

if (error) {
  return <ErrorState message={error} retry={retry} />;
    }
    
    if (users.length === 0) {
        return (
            <EmptyState
                title="No Users Found"
                description="The API returned no users" />
        )
    }
  return (
    <div className="page p-6">
      <div className="mb-8">
        <h1>Team Members</h1>

        <p className="mt-2 text-slate-500">
          Users fetched from the DummyJSON API.
        </p>
      </div>

      <div className="relative mb-8">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

              <input placeholder="Search users..."
                  value={search}
                  onChange={(e) =>
                      setSearch(e.target.value)
                  }
                  className="pl-11" />
      </div>

      <UserList users={filteredUsers} />
    </div>
  );
}
