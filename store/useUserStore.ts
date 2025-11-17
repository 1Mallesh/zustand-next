// store/useUserStore.ts
import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL; // ⬅️ using env file

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${API_URL}/users`);

      if (!res.ok) throw new Error("Failed to load users");

      const data = await res.json();

      set({ users: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
