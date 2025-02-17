import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import Userbar from "./components/userbar";
import TaskItem from "./components/TaskItem";
import Isrelevent from "./components/Isrelevent";
import { v4 as uuidv4 } from 'uuid';
import "./index.css";

const API_URL = "http://localhost:5000";

const App: React.FC = () => {
  const [showRelevant, setShowRelevant] = useState(true);

  const [tasks, setTasks] = useState<any[]>([]);


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
        setTasks(data.filter((task) => !showRelevant ? !task.isrelevant : task.isrelevant));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };


    fetchTasks();
  }, []);

  const handleAddTask = (newTask: { task_id: string; taskbody: string; timecreated: string; timeout: string; isComplete: boolean; isrelevant: boolean }) => {
    const b = newTask.task_id;
    const taskWithId = { ...newTask, b: uuidv4() };
    setTasks((prevTasks) => [taskWithId, ...prevTasks]);
  };


  const handleToggleRelevance = (isRelevant: boolean) => {
    setShowRelevant(isRelevant);

    if (isRelevant) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.isrelevant));
    } else {

      fetch(`${API_URL}/getalltasksbyuser`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  };


  const handleDeleteTask = async (task: { task_id: string }) => {
    try {
      const res = await fetch(`${API_URL}/deletetask/${task.task_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ task: task.task_id }),

      });

      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }

      const data = await res.json();

      setTasks((prevTasks) => prevTasks.filter((t) => t.task_id !== task.task_id));

    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };


  const handleCompleteTask = async (task: { task_id: string, iscomplete: boolean }) => {

    try {
      const updatedTasks = tasks.map((t) =>
        t.task_id === task.task_id ? { ...t, iscomplete: !t.iscomplete } : t
      );

      setTasks(updatedTasks);

      const iscomstring = !task.iscomplete ? "true" : "false";



      const res = await fetch(`${API_URL}/updatecheck/${task.task_id}/${iscomstring}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",

      });

      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }

      const data = await res.json();

    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleRelevant = async (task: { task_id: string; isrelevant: boolean }) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.task_id === task.task_id ? { ...t, isrelevant: !t.isrelevant } : t
        )
      );
      const isRelevant = !task.isrelevant ? "true" : "false";

      const res = await fetch(`${API_URL}/updatrelevant/${task.task_id}/${isRelevant}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }
      setTasks((prevTasks) => [...prevTasks]);


    } catch (error) {
      console.error("Error updating relevance:", error);
    }
  };
  const handleRelevantalert = async (task: { task_id: string; isrelevant: boolean }) => {

    const confirmed = window.confirm("Are you sure you want to move this task?");
    
    if (confirmed) {
      handleRelevant(task);
    } else {
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
        <Isrelevent onToggle={handleToggleRelevance} />

      </div>

      <div className="task-toggle-container">

        <div className="task-list">
          {tasks
            .filter((task) => showRelevant ? task.isrelevant : !task.isrelevant)
            .map((task) => (
              <TaskItem
                key={task.task_id}
                task={task}
                onDelete={() => handleDeleteTask(task)}
                onComplete={() => handleCompleteTask(task)}
                onrelevant={() => handleRelevantalert(task)}
              />

            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
