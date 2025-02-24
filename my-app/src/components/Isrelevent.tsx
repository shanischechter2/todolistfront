import React from "react";

import "../css-for-components/isrelenet.css";
import { useTaskContext } from "../Task/TaskContext";

const Isrelevent: React.FC = () => {
  const { showRelevant, toggleRelevance } = useTaskContext();

  const handleToggle = () => {
    toggleRelevance(!showRelevant);
  };

  return (
    <div className="releventcontainer">
      <label className="toggle-switch">
        <input type="checkbox" checked={showRelevant} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
      <p>{showRelevant ? "Relevant tasks" : "Irrelevant tasks"}</p>
    </div>
  );
};

export default Isrelevent;
