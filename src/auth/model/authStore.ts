import { create } from "zustand";

interface User {
  _id: string;
  name?: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,

  setUser: (user) =>
    set({
      user,
      isAuth: Boolean(user),
    }),

  logout: () =>
    set({
      user: null,
      isAuth: false,
    }),
}));