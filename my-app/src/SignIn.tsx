import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const API_URL = "http://localhost:5000";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSignIn = async () => {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    console.log(data);

    if (data.user) {
      alert("Signup successful! Please log in.");
      navigate("/login");
    } else {
      alert("Signup failed. Try again.");
    }
  };
    // const handletoLogin = () => {
      
    //     navigate("/login");
    //   };
      return (
        <div className="headerdiv">
          <div>
            <div className="headerdiv">
                 <h1>Sign Up</h1>
            </div>
          <div className="signinplatforms">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSignIn}>Sign Up</button>
          <div>
            <a onClick={() => navigate("/login")}>Already have an account? Log in here</a>
          </div>
          </div>
       
        </div>
          </div>
         
      );
    };

    
export default SignIn;