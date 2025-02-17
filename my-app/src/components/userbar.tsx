import React, { useState, useEffect } from "react";
import "./userBar.css";



const API_URL = "http://localhost:5000";

const Userbar: React.FC = () => {
  const [username, setUsername] = useState("");


  useEffect(() => {
    const handleusebar = async () => {
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
        setUsername(data.username);

      } catch (error) {
        console.error("Error adding task:", error);
      }
    };
    handleusebar(); 
  }, []);
  return (
    <header>
      <h1 className="userbarh1">Welcome {username}</h1>

    </header>

  );

};

export default Userbar;