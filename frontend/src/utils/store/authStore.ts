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

const isTokenValid = () => {
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!tokenExpiration) return false;
  return new Date(tokenExpiration) > new Date();
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isLoggedIn: !!localStorage.getItem("token") && isTokenValid(),
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
