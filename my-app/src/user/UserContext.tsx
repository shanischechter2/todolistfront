import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Api_user_repository } from "./User_API_Repository";
import { User } from "./user"; 

type UserContextType = {
  user: Omit<User, "password" | "email"> | null; 
  username: string;
  email: string;
  password: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => Promise<void>;
  logout: () => void;
  signUp: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Omit<User, "password" | "email"> | null>(null); 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Api_user_repository.get_user_name();
       

          setUser({ username: response??""}); 
        
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const login = async () => {
    try {
      const response = await Api_user_repository.login({ email, password });
      console.log( email, password);
      if (response.error) {
        alert(response.error);
        return;
      }
      setUser({ username: response.username });
      setPassword(""); 
      setEmail("");
      navigate("/app");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const signUp = async () => {
    try {
      const response = await Api_user_repository.signUp({ username, email, password });
      if (response.error) {
        alert(response.error);
        return;
      }
      alert("Sign-up successful!"); 

      navigate("/login");
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        username,
        email,
        password,
        setUsername,
        setEmail,
        setPassword,
        login,
        logout,
        signUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
