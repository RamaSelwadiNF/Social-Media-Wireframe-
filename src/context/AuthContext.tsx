import React, { createContext, useContext, useState } from "react";

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface AuthContextType {
  currentUser: User | null;
  login: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

async function fetchUsers(url: string): Promise<User[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("loop_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const users = await fetchUsers(USERS_API_URL);

      const normalizedName = name.trim().toLowerCase();
      const normalizedEmail = email.trim().toLowerCase();

      const matchedUser = users.find(
        (u) =>
          u.name.trim().toLowerCase() === normalizedName &&
          u.email.trim().toLowerCase() === normalizedEmail
      );

      // Check if user exists and password is username + 123
      if (matchedUser && password.trim() === `${matchedUser.username}123`) {
        setCurrentUser(matchedUser);
        localStorage.setItem("loop_user", JSON.stringify(matchedUser));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
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