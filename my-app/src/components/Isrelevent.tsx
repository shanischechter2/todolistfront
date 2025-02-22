import React, { useState } from "react";
import "./isrelenet.css";
import {TaskItemProps as Task} from "../task";
type IsreleventProps = {
  onToggle: (isRelevent: boolean) => void;
};

const Isrelevent: React.FC<IsreleventProps> = ({ onToggle }) => {
  const [isRelevent, setIsRelevent] = useState(true);

  const handleToggle = () => {
    const newState = !isRelevent;
    setIsRelevent(newState);
    onToggle(newState);
  };

  return (
    <div className="releventcontainer">
      <label className="toggle-switch">
        <input type="checkbox" checked={isRelevent} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
      <p>{isRelevent ? "Relevent tasks" : "UnRelevent tasks"}</p>
    </div>
  );
};

export default Isrelevent;
