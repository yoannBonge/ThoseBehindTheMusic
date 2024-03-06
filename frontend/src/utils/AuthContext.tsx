import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    const isAdminValue = sessionStorage.getItem("isAdmin");
    setIsAdmin(isAdminValue === "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAdmin");
  };

  const authContextValue: AuthContextType = {
    isLoggedIn,
    isAdmin,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
