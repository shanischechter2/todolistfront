import React from "react";

import "../css-for-components/TaskItem.css"
import {  Task } from "../Task/task";
import { useTaskContext } from "../Task/TaskContext";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { deleteTask, completeTask, toggleTaskRelevance } = useTaskContext();

  const handleTimeStatus = (task: Task) => {
    const timeoutDate = new Date(task.timeout);
    const now = new Date();
    const timeDifferenceMs = timeoutDate.getTime() - now.getTime();
    const timeDifferencedays = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24)) + 1;

    const classname = (() => {
      switch (true) {
        case timeDifferencedays <= 0 && !task.iscomplete:
          return "warning";
        case timeDifferencedays <= 1 && !task.iscomplete:
          return "prewarning";
        default:
          return "task-card-continer";
      }
    })();

    const absTimeLeft = Math.abs(timeDifferencedays);
    const message = (() => {
      switch (true) {
        case timeDifferencedays === 0:
          return "You have today to finish your task";
        case timeDifferencedays < 0:
          return `You needed to finish your task ${absTimeLeft} days ago`;
        default:
          return `You have ${timeDifferencedays} days left to finish your task`;
      }
    })();

    return { daysLeft: message, classname };
  };

  const getClass = handleTimeStatus(task);

  return (
    <div className={getClass.classname}>
      <div className={`task-card ${task.iscomplete ? "completed" : ""}`}>
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.iscomplete}
          onChange={() => completeTask(task)}
        />
        <p id="taskb">{task.taskbody}</p>
        <p>{getClass.daysLeft}</p>
        <button className="delete-btn" onClick={() => deleteTask(task)}>X</button>
        <button className="relevant-btn" onClick={() => toggleTaskRelevance(task)}>→→</button>
      </div>
    </div>
  );
};

export default TaskItem;
