import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {Api_user_repository} from './User_API_Repository';
const API_URL = "http://localhost:5000";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");// REACT CONTEXT
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await Api_user_repository.login({ email, password} );
   
         if (response.error) {
            alert(response.error); // Show error in an alert popup
            return;
          }
      
          navigate("/app");
      
      
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
