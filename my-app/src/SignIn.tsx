import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {Api_user_repository} from './User_API_Repository';
import {signUpTests} from './SignupTests';
import {User} from './user'

const API_URL = "http://localhost:5000";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSignIn = async () => {
    const errorMessage = signUpTests.tests({username,email,password });
    
    if (errorMessage) {
      alert(errorMessage); 
      return;
    } 
      
      const response = await Api_user_repository.signUp({username, email, password} );
  
      if (response.error) {
        alert(response.error); 
        return;
      }
  
      alert("Sign-up successful!");
      navigate("/login");
    
  };
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