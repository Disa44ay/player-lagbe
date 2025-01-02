import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isManager, setIsManager] = useState(false);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Correct usage of jwtDecode
        console.log("Decoded token:", decodedToken);
        
        if (decodedToken?.id) { // Ensure decodedToken.id exists
          setUser(decodedToken);
          setIsLoggedIn(true);
          setId(decodedToken.id);
          checkIfManager(decodedToken.id); // Check if user is a manager
        } else {
          console.error("Invalid token structure: Missing 'id'");
          setLoading(false);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const checkIfManager = async (userId) => {
    try {
      const response = await axios.get("http://localhost:4000/api/manager/list");
      const managers = response.data.data;
      console.log("Manager list fetched:", managers);

      if (Array.isArray(managers)) { // Ensure managers is an array
        const isUserManager = managers.some((manager) => manager.userId === userId);
        console.log(`Is user (ID: ${userId}) a manager?`, isUserManager);
        setIsManager(isUserManager);
      } else {
        console.error("Invalid manager list format. Expected an array.");
      }
    } catch (error) {
      console.error("Error fetching manager status:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setIsManager(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isManager, logout, loading , id}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
