import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import SignIn from "./SignIn";
import App from "./App";
import React from "react";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/app" element={<App />} />
    </Routes>
  );
};

export default AppRoutes;
