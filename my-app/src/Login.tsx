import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
const API_URL = "http://localhost:5000";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/app");
    } else {
      alert("Login failed. Check your email or password.");
    }
  };

  return (
    <div >
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
