import React, { useState, useEffect } from "react";
import "./TaskItem.css";
import {TaskItemProps as Task} from "../task";

type TaskItemProps = {
  task: Task;
  onDelete: () => void;
  onComplete: () => void;
  onRelevant: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onComplete, onRelevant }) => {


  const hendeletime = (task:Task) => {
    const timeoutDate = new Date(task.timeout);
 
    const now = new Date();


    const timeDifferenceMs = timeoutDate.getTime() - now.getTime();


    const timeDifferencedays = (Math.floor((timeDifferenceMs / (1000 * 60 * 60 * 24))) + 1);



    const classname = (() => {
      switch (true) {
        case timeDifferencedays <= 0 && !task.iscomplete:
          return "warning";
        case timeDifferencedays <= 1 && !task.iscomplete:
          return "prewarning";
        default:
          return "task-card2";
      }
    })();
   const abs_time_left_for_task=Math.abs(timeDifferencedays);
    const string_for_task = (() => {
      switch (true) {
        case timeDifferencedays === 0 :
          return "you have today to finish your task";
          case timeDifferencedays < 0 :
            return `you had needed to finish your task ${abs_time_left_for_task} days ago`
         default:
          return `you have ${timeDifferencedays} left to finish your task`;
      }
    })();
 
    return {
      daysLeft: `${string_for_task}`,
      classname,
    };
  }

  const getclass = hendeletime(task);//WTFFFFFFFFFFFFFFFFFFF
  const iscomleate = task.iscomplete;
  return (
    <div className={getclass.classname}>
      <div className={`task-card ${iscomleate ? "completed" : ""}`}>
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.iscomplete}
          onChange={onComplete}
        />
        <p id="taskb">{task.taskbody}</p>

        <p> {getclass.daysLeft}</p>
        <button className="delete-btn" onClick={onDelete}>X</button>
        <button className="relevant-btn" onClick={() => { onRelevant(); }}>→→</button>
      </div>
    </div>

  );
};

export default TaskItem;



