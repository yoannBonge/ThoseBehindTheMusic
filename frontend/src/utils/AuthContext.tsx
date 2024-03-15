import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  email: string | null;
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
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const isAdminValue = localStorage.getItem("isAdmin");
      setIsAdmin(isAdminValue === "true");
      const userEmail = localStorage.getItem("email");
      setEmail(userEmail || null);
    }
  }, []);

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
