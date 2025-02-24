import {User} from './user'

const API_URL = "http://localhost:5000";


export const Api_user_repository={
  async login(user: Pick<User,"email"|"password">) {
    try{
      const res = await fetch(`${API_URL}/login`, {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email:user.email, password:user.password }),
    });
    const data = await res.json();
  
    return data;

    }catch(error){
      return { error: error.message };
    }
    
  },
   async signUp(user: Omit<User,"user_id">) {
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username:user.username, email:user.email, password:user.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Sign-up failed");
      }

      return data;
    } catch (error) {
      return { error: error.message };
    }
  },
  async get_user_name(){
     try {
      const res = await fetch(`${API_URL}/getusername`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",

      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server Error: ${res.status} - ${errorText}`);
      }
      
     const data = await res.json();
     const username=data.username as string
      return username;

    } catch (error) {
      console.error("Error adding task:", error);
    }
  }
};
