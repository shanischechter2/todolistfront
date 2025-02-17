
import React, { useState } from "react";

const API_URL = "http://localhost:5000";



type ButtonProps = {
  onAddTask: (task: { task_id: string; taskbody: string; timecreated: string; timeout: string; isComplete: boolean,isrelevant: boolean}) => void;
};

const Button: React.FC<ButtonProps> = ({ onAddTask }) => {
  const [taskbody, setTask] = useState("");
  const [TimeOut, setdate] = useState("");

 const API_URL = "http://localhost:5000";

const handleAddTask = async () => {

  try {
    const formatDate = (date: Date) => {
      return date.toISOString().split("T")[0];
    };
  
    const selectedTimeOut = TimeOut || formatDate(new Date());
    console.log(selectedTimeOut);

    const res = await fetch(`${API_URL}/addtask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ taskbody, timeOut : selectedTimeOut }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Server Error: ${res.status} - ${errorText}`);
    }
   
    const data = await res.json();

    const formattedTask = {
      task_id: data.rows[0].task_id,
      taskbody: taskbody,
      timecreated: data.timecreated || new Date().toISOString(),
      timeout: data.timeout || TimeOut || new Date().toISOString(),
      isComplete: data.isComplete || false,
      isrelevant:data.isRelevant || true
    };
    onAddTask(formattedTask);

    setTask("");
    setdate("");

  } catch (error) {
    console.error("Error adding task:", error);
  }
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

export default Button;
