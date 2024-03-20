import { ReactNode, createContext, useEffect, useState } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  email: string | null;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const login = () => {
    setIsLoggedIn(true);
    const isAdminValue = localStorage.getItem("isAdmin");
    setIsAdmin(isAdminValue === "true");
    const userEmail = localStorage.getItem("email");
    setEmail(userEmail || null);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("email");
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const expirationTime = tokenExpiration
        ? new Date(tokenExpiration).getTime()
        : 0;
      const currentTime = Date.now();

      if (currentTime < expirationTime) {
        login();
      } else {
        logout();
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  });

  const authContextValue: AuthContextType = {
    isLoggedIn,
    isAdmin,
    email,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
