import React from "react";
import { useTaskContext } from "../Task/TaskContext";
import "../css-for-components/taskadd.css"

const AddingTask: React.FC = () => {
  const { taskbody, timeout, setTaskBody, setTimeout, addTask } = useTaskContext();
  const handleTimeOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(new Date(event.target.value));
};
  return (
    <div className="task-section">
  <h2 className="task-title">Create a New Task</h2>
  <div className="task-form">
    <input
      type="text"
      className="task-input"
      placeholder="Enter task description..."
      value={taskbody}
      onChange={(e) => setTaskBody(e.target.value)}
    />
    <input
      type="date"
      className="task-date"
      value={timeout.toISOString().split("T")[0]}
      onChange={handleTimeOutChange}
    />
    <button className="task-button" onClick={addTask}>Add Task</button>
  </div>
</div>

  
  );
};

export default AddingTask;
