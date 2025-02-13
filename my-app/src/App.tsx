import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import Userbar from "./components/userbar";
import TaskItem from "./components/TaskItem";
// import Login from './Login';
// import main from './main';
import "./index.css";

const API_URL = "http://localhost:5000";

const App: React.FC = () => {

 // const [tasks, setTasks] = useState<any[]>([]); 
  const [taskescreacte, setTaskscreats] = useState<any[]>([]);
  const [tasketimeout, setTaskstimeout] = useState<any[]>([]);


const [tasks, setTasks] = useState<any[]>([]);
//  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/getalltasksbyuser`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`Server Error: ${res.status}`);
        }

        const data = await res.json();
        setTasks(data); // Store tasks in state
        console.log("Fetched tasks:", data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };


    fetchTasks();
  }, []);

  const handleAddTask = (newTask: { task_id: string; taskbody: string; timecreated: string; timeout: string; isComplete: boolean }) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); 
  };
  
  


  const handleDeleteTask = async (task: { task_id: string }) => {
    try {
      const res = await fetch(`${API_URL}/deletetask/${task.task_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({task :task.task_id}),
      
       });
      console.log(task.task_id)
      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }

      const data = await res.json();
     
      setTasks((prevTasks) => prevTasks.filter((t) => t.task_id !== task.task_id));
      console.log("Fetched tasks:", data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const onNunrelevet = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index-1)); 
  };

  const handleCompleteTask = async (task: { task_id: string,iscomplete:boolean }) => {
 
    try {
      console.log("ttttt:"+task.iscomplete)
          const updatedTasks = tasks.map((t) =>
            t.task_id === task.task_id ? { ...t, iscomplete: !t.iscomplete } : t
          );
      
          setTasks(updatedTasks); 
      
          const iscomstring = !task.iscomplete ? "true" : "false";
      
       
  
          const res = await fetch(`${API_URL}/updatecheck/${task.task_id}/${iscomstring}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
           // body: JSON.stringify({ task_id: task.task_id, iscom: newIsCompleted }), // Send correct data
          });
  
          if (!res.ok) {
            throw new Error(`Server Error: ${res.status}`);
          }
  
          const data = await res.json();
          console.log("Updated task:", data);
        } catch (error) {
          console.error("Error updating task:", error);
        }
  };
  

    


  
  return (
    <div>
      <div>
        <Userbar 
       />
      </div>
      <div className="headerdiv">
        <Header />
       
      </div>
      <div className="entertaskesdiv">
        <Button onAddTask={handleAddTask} />
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.task_id}
            task={task}
            //checkbox={task}
            onDelete={() => handleDeleteTask(task)}
            onComplete={() => handleCompleteTask(task)}
           // onNunrelevet={() => onNunrelevet(task.task_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
