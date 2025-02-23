import React from "react";
import TaskItem from "../components/TaskItem";
import AddingTask from "../components/AddingTask";
import "../components/TaskItem"; 
import Isrelevent from "../components/Isrelevent";
import { useTaskContext } from "./TaskContext";

const TaskManager: React.FC = () => {
  const { tasks, showRelevant} = useTaskContext();

  return (
    <div>
      <div>
        <div className="entertaskesdiv">
        <AddingTask />
      </div>
      <div className="entertaskesdiv">
        <Isrelevent />
      </div>

      </div>
      <div>
         <div className="task-list-container">
        <div className="task-list">
          {tasks
            .filter((task) => (showRelevant ? task.isrelevant : !task.isrelevant))
            .map((task) => (
              <TaskItem
                key={task.task_id}
                task={task}
           
              />
            ))}
        </div>
      </div>
      </div>
     
    </div>
  );
};

export default TaskManager;
