import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api"; // ⭐ use axios instance WITH credentials

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const isAdmin = user?.role === "admin";

  // Load current logged-in user on refresh
  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoadingUser(true);
      try {
        const response = await api.get("/users/me"); // ⭐ FIXED
        setUser(response.data.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await api.get("/users/logout"); // ⭐ FIXED
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loadingUser, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
