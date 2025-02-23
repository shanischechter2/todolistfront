import { useNavigate } from "react-router-dom";
import React from "react";
import { useUserContext } from "./user/UserContext";

const Login = () => {
  const { email, password, setEmail, setPassword, login } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Both email and password are required!");
      return;
    }
    login();
  };

  return (
    <div>
      <div className="headerdiv">
        <h1>Login</h1>
      </div>
      <div className="entertaskesdiv">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className="pathtosignin">
        <a onClick={() => navigate("/signin")}>Don't have an account? Sign up here</a>
      </div>
    </div>
  );
};

export default Login;
