import React from "react";
import "./userBar.css";
import { useUserContext } from "../user/UserContext";

const Userbar: React.FC = () => {
  const { user, logout } = useUserContext();

  return (
    <header>
      <h1 className="userbarh1">Welcome {user ? user.username : "Guest"}</h1>
      {user && <button onClick={logout}>Logout</button>}
    </header>
  );
};

export default Userbar;
