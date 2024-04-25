import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  email: string | null;
}

interface AuthActions {
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isLoggedIn: !!localStorage.getItem("token"),
  isAdmin: localStorage.getItem("isAdmin") === "true",
  email: localStorage.getItem("email") || null,
  login: () =>
    set((state) => ({
      ...state,
      isLoggedIn: true,
      isAdmin: localStorage.getItem("isAdmin") === "true",
      email: localStorage.getItem("email") || null,
    })),
  logout: () =>
    set((state) => ({
      ...state,
      isLoggedIn: false,
      isAdmin: false,
      email: null,
    })),
}));
