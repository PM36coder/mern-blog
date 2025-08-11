/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { API } from "../src/utils/Axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [token , setToken] = useState(localStorage.getItem("token") || null)

  //logout 

const logout = async () => {
  try {
    console.log("🚪 Logging out user...");

    const response = await API.post(
      "/user/logout",
      {}, // body empty (agar zarurat nahi)
      {
        withCredentials: true, // Send cookies to backend
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      console.log("✅ Backend logout successful");
    } else {
      console.warn("⚠️ Backend logout failed, but continuing with frontend logout");
    }
  } catch (error) {
    console.error("💥 Logout API error:", error);
  } finally {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("✅ User logged out successfully");
  }
};



  return (
    <AuthContext.Provider value={{ user, setUser,token, setToken ,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
