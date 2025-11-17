// hooks/useUserStore.ts
import { useUserStore } from "@/store/useUserStore";

export const useUsers = () => {
  const users = useUserStore((s) => s.users);
  const loading = useUserStore((s) => s.loading);
  const error = useUserStore((s) => s.error);
  const fetchUsers = useUserStore((s) => s.fetchUsers);

  return { users, loading, error, fetchUsers };
};
