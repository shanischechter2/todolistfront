import React, { useState, useEffect } from "react";
import { Api_task_repository } from "../Takk_API_Repository";
import TaskItem from "./TaskItem";
import "./TaskItem.css";
import AddingTask from "./AddingTask";
import Isrelevent from "./Isrelevent";
import {TaskItemProps as Task} from "../task"

const TaskManager: React.FC = () => {
  const [showRelevant, setShowRelevant] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
    const fetchTasks = async () => {
         const response = await Api_task_repository.gettasks();
        
            if (response.error) {
              alert(response.error); 
              return;
            }
            setTasks(response.filter((task) => !showRelevant ? !task.isrelevant : task.isrelevant));
    };


    fetchTasks();
  }, []);


//kovez nifrad shel types

  const handleAddTask = async (taskbody: string, timeout: string) => {
    try {
        const response = await Api_task_repository.adding_task(taskbody, timeout);

        if (response.error) {
            alert(response.error);
            return;
        }

        const newTask: Task = {
            task_id: response.task_id,
            taskbody,
            timecreated: response.timecreated || new Date().toISOString(),
            timeout: response.timeout || timeout || new Date().toISOString(),
            iscomplete: response.isComplete || false,
            isrelevant: response.isRelevant || true,
        };
   
        setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (error) {
        console.error("Error adding task:", error);
    }
};

  const handleToggleRelevance = async (isRelevant: boolean) => {

    setShowRelevant(isRelevant);

    const response = await Api_task_repository.gettasks();
        
    if (response.error) {
      alert(response.error); 
      return;
    }
     setTasks(response);
 
     
  };


  const handleDeleteTask = async (task: Task) => {
    const response = await Api_task_repository.delete_task(task);
        
    if (response.error) {
      alert(response.error); 
      return;
    }
    setTasks((prevTasks) => prevTasks.filter((t) => t.task_id !== task.task_id));
  };


  const handleCompleteTask = async (task: Task) => {

      const updatedTasks = tasks.map((t) =>
        t.task_id === task.task_id ? { ...t, iscomplete: !t.iscomplete } : t
      );

      setTasks(updatedTasks);
      const response = await Api_task_repository.update_complete_for_task(task);
        
    if (response.error) {
      alert(response.error); 
      return;
    }

  };
  const handleRelevant = async (task: Task) => {

      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.task_id === task.task_id ? { ...t, isrelevant: !t.isrelevant } : t
        )
      );
      const response = await Api_task_repository.update_relevent_for_task(task);
        
      if (response.error) {
        alert(response.error); 
        return;
      }

  };
  const handleRelevantalert = async (task: Task) => {

    const confirmed = window.confirm("Are you sure you want to move this task?");

    if (confirmed) {
      handleRelevant(task);
    } else {           
    }
  };

  return (
    <div>
        <div className="entertaskesdiv">
    <AddingTask onAddTask={handleAddTask} />

  </div>
  <div className="entertaskesdiv">

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
            onRelevant={() => handleRelevantalert(task)}
          />

        ))}
    </div>
  </div>
    </div>
    
  );
};

export default TaskManager;