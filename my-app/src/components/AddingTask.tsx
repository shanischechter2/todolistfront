
import React, { useState } from "react";
import {Api_task_repository} from '../Takk_API_Repository';
const API_URL = "http://localhost:5000";
import {TaskItemProps as Task} from "../task"



type TaskProps = {
  onAddTask: (taskbody: string, timeout: string) => void;
};

const AddingTask: React.FC<TaskProps> = ({ onAddTask }) => {
  const [taskbody, setTask] = useState("");
  const [TimeOut, setdate] = useState("");

  const handleAddTask = () => {
    if (taskbody === "") {
      alert("The task is empty");
      return;
    }
    const date_tape=new Date(TimeOut);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    if(date_tape < today)
    {
      alert("you cant select a date that pass for a task");
      return;
    }


    onAddTask(taskbody, TimeOut); 
    setTask("");
    setdate("");
  };



  return (
    <div className="todolistback">
      <input
        type="text"
        placeholder="Enter a task..."
        value={taskbody}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="Date"
        className="task-checkbox"
        value={TimeOut}
        onChange={(e) => setdate(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddingTask;
