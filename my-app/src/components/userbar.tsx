import React, { useState, useEffect } from "react";
import "./userBar.css";
import {Api_user_repository} from '../User_API_Repository';

const API_URL = "http://localhost:5000";

const Userbar: React.FC = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleusebar = async () => {
      const username2 = await Api_user_repository.get_user_name();
      setUsername(username2??"");
    }
      handleusebar(); 
  }, []);
  return (
    <header>
      <h1 className="userbarh1">Welcome {username}</h1>

    </header>

  );

};

export default Userbar;