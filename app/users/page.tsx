// app/users/page.tsx

import UserList from "@/components/ui/UserList";

export default function UsersPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Users (Zustand Example)</h1>
      <UserList />
    </div>
  );
}
