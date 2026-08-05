import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => boolean;
  register: (user: RegisterData) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem("currentUser");
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  function register(newUser: RegisterData) {
    const users: RegisterData[] = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u) => u.email === newUser.email);
    if (exists) {
      return false;
    }
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  }

  function login(email: string, password: string) {
    const users: RegisterData[] = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (!foundUser) {
      return false;
    }

    const session = { name: foundUser.name, email: foundUser.email,};
    localStorage.setItem("currentUser", JSON.stringify(session));
    setUser(session);
    return true;
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)!;
}
