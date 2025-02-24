import React from "react";

 import "../css-for-components/userBar.css"
import { useUserContext } from "../user/UserContext";

const Userbar: React.FC = () => {
  const { user, logout } = useUserContext();

  return (
    <header className="userbar">
    <h1 className="userbar-title">
      Welcome, <span className="username">{user ? user.username : "Guest"}</span>
    </h1>
    {user && <button className="logout-button" onClick={logout}>Logout</button>}
  </header>

  );
};

export default Userbar;
