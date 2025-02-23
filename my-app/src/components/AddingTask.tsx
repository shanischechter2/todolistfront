import React from "react";
import { useTaskContext } from "../Task/TaskContext";

const AddingTask: React.FC = () => {
  const { taskbody, TimeOut, setTaskBody, setTimeOut, addTask } = useTaskContext();

  return (
    <div className="todolistback">
      <input
        type="text"
        placeholder="Enter a task..."
        value={taskbody}
        onChange={(e) => setTaskBody(e.target.value)}
      />
      <input
        type="Date"
        className="task-checkbox"
        value={TimeOut}
        onChange={(e) => setTimeOut(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default AddingTask;
