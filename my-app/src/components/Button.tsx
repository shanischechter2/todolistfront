
import React, { useState } from "react";

const API_URL = "http://localhost:5000";



type ButtonProps = {
  onAddTask: (task: { task_id: string; taskbody: string; timecreated: string; timeout: string; isComplete: boolean }) => void;
};

const Button: React.FC<ButtonProps> = ({ onAddTask }) => {
  const [taskbody, setTask] = useState("");
  const [TimeOut, setdate] = useState("");

 const API_URL = "http://localhost:5000";

const handleAddTask = async () => {
  
  try {
    const res = await fetch(`${API_URL}/addtask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ taskbody, TimeOut }),
    });

    console.log("Response status:", res.status);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Server Error: ${res.status} - ${errorText}`);
    }
   
    const data = await res.json();
    const formattedTask = {
      task_id: data.task_id || Date.now().toString(), // Generate temporary ID if missing
      taskbody: taskbody,
      timecreated: data.timecreated || new Date().toISOString(),
      timeout: data.timeout || TimeOut,
      isComplete: data.isComplete || false, // Default to false if missing
    };

    console.log("New task added:", formattedTask);

    onAddTask(formattedTask);

    setTask("");
    setdate("");

    console.log("Server response:", data);
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
