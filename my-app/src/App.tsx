import React from "react";
import Header from "./components/Header";
import Userbar from "./components/Userbar";
import { AppProvider } from "./AppContext"; 
import TaskManager from "./components/TaskManager";
import "./index.css";

const App: React.FC = () => {
  return (
    <div>
      <Userbar />
      <div className="headerdiv">
        <Header />
      </div>
      <AppProvider>
        <TaskManager />
      </AppProvider>
      
    </div>
  );
};

export default App;
