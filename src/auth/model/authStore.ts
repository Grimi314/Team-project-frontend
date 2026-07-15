import { create } from "zustand";

interface User {
  _id: string;
  name?: string;
  email: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuth: boolean;
  isAuthInitialized: boolean;

  setUser: (user: User | null) => void;
  setAuthInitialized: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuth: false,
  isAuthInitialized: false,

  setUser: user =>
    set({
      user,
      isAuth: Boolean(user),
    }),

  setAuthInitialized: value =>
    set({
      isAuthInitialized: value,
    }),

  logout: () =>
    set({
      user: null,
      isAuth: false,
    }),
}));