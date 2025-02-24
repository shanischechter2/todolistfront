import { useNavigate } from "react-router-dom";
import React from "react";
import { useUserContext } from "./user/UserContext";
import { signUpTests } from "./SignupTests";



const SignIn = () => {
  const { username, email, password, setUsername, setEmail, setPassword, signUp } = useUserContext();
  const navigate = useNavigate();

  const handleSignIn = () => {

    const errorMessage = signUpTests.tests({ username, email, password });
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    signUp();
  };

  return (
    <div className="container_for_antering">
      
    <div className="headerdiv">
      <h1>Sign Up</h1>
      </div>
      <div>
         <div className="signinplatforms">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignIn}>Sign Up</button>
        <div className="pathtologin">
          <a onClick={() => navigate("/login")}>Already have an account? Log in here</a>
        </div>
      </div>
      </div>
     
    </div>
  );
};

export default SignIn;
