import React from "react";
import Header from "./components/Header";
import Userbar from "./components/userbar";
import { TaskProvider } from "./Task/TaskContext";
import TaskManager from "./Task/TaskManager";
import { UserProvider } from "./user/UserContext"; 
// import "./index.css";

const App: React.FC = () => {
  return (
    <UserProvider> 
      <Userbar />
      <div className="headerdiv">
        <Header />
      </div>
      <TaskProvider>
        <TaskManager />
      </TaskProvider>
    </UserProvider>
  );
};

export default App;
