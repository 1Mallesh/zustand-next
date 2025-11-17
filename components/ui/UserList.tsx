// components/ui/UserList.tsx
"use client";

import { useEffect } from "react";
import { useUsers } from "@/hooks/useUserStore";

export default function UserList() {
  const { users, loading, error, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <p className="text-blue-500">Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <div
          key={user.id}
          className="p-4 border rounded-lg  shadow-sm mb-[10px]"
        >
          <p className="font-bold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      ))}
    </div>
  );
}
