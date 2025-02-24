import React from "react";
import TaskItem from "../components/TaskItem";
import AddingTask from "../components/AddingTask";
import "../components/TaskItem"; 
import Isrelevent from "../components/Isrelevent";
import { useTaskContext } from "./TaskContext";
import "./TaskManager.css"

const TaskManager: React.FC = () => {
  const { tasks, showRelevant} = useTaskContext();

  return (
    <div className="task-manager">
      {/* Left Section - Task Handling */}
      <div className="task-control">
        <AddingTask />
        <Isrelevent />
      </div>

      {/* Right Section - Task List */}
      <div className="task-list-container">
        <div className="task-list">
          {tasks
            .filter((task) => (showRelevant ? task.isrelevant : !task.isrelevant))
            .map((task) => (
              <TaskItem key={task.task_id} task={task} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
