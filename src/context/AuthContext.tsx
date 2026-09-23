import React, { createContext, useContext, useState } from "react";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface AuthContextType {
  currentUser: User | null;
  login: (name: string, email: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("loop_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (name: string, email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users: User[] = await res.json();

      const matched = users.find(
        (u) =>
          u.name.trim().toLowerCase() === name.trim().toLowerCase() &&
          u.email.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (matched) {
        setCurrentUser(matched);
        localStorage.setItem("loop_user", JSON.stringify(matched));
        setIsLoading(false);
        return true;
      }
    } catch (err) {
      console.error("Login fetch error:", err);
    }
    setIsLoading(false);
    return false;
  };

  const logout = (): void => {
    setCurrentUser(null);
    localStorage.removeItem("loop_user");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}