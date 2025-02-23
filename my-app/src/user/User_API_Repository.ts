const API_URL = "http://localhost:5000";


export class Api_user_repository{
  static async login({ email, password }: { email: string; password: string }) {
    try{
      const res = await fetch(`${API_URL}/login`, {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
  
    return data;

    }catch(error){
      return { error: error.message };
    }
    
  }
  static async signUp({ username, email, password }: { username: string; email: string; password: string }) {
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Sign-up failed");
      }

      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
    static async get_user_name(){
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
  };
}
