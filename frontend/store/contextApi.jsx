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

      // Call backend logout API
      const response = await API.post("/api/user/logout", {
        
        credentials: "include", // Send cookies
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("✅ Backend logout successful");
      } else {
        console.warn("⚠️ Backend logout failed, but continuing with frontend logout");
      }
    } catch (error) {
      console.error("💥 Logout API error:", error);
      // Continue with frontend logout even if API fails
    } finally {
      // Clear state
      setUser(null);
      setToken(null);
      
      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      
      console.log("✅ User logged out successfully");
      
      
    }}


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
