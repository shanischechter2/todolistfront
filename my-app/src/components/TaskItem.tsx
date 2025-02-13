import React, { useState } from "react";
import "./TaskItem.css";

type TaskItemProps = {
  task: {
    task_id: string;
    taskbody: string;
    timecreated: string;
    timeout: string;
    iscomplete: boolean;
  };
  onDelete: () => void;
  onComplete: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(task.iscomplete);
  const [time, setime] = useState("");

  const worning = () => {

  };

  const hendeletime = (task: { timeout: string; timecreated: string,iscomplete:boolean }) => {
    const timeoutDate = new Date(task.timeout);
    const createdDate = new Date(task.timecreated);
    const now=new Date();


    const timeDifferenceMs = timeoutDate.getTime() - now.getTime();
   

    const timeDifferencedays = (Math.floor((timeDifferenceMs / (1000 * 60 * 60 * 24)))+1);
 

    // const timeDifferenceH = Math.floor((timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const t = timeDifferencedays.toString();


    const classname = timeDifferencedays <= 1 && !task.iscomplete ? "warning" : "task-card";


    const finael = 'days to finish:' + t;
    return {
      daysLeft: `Days to finish: ${timeDifferencedays}`,
      classname,
    };
  }
  const handleCheckboxClick = () => {
     setIsCompleted(!isCompleted);
  //   onComplete();


  };

  const c = hendeletime(task);
  console.log(task.iscomplete)
  const d=task.iscomplete;
  return (
    <div className={c.classname}>
      <div className={`task-card ${d ? "completed" : ""}`}>
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.iscomplete}
          onChange={onComplete}
        />
        <p id="taskb">{task.taskbody}</p>
 
        <p> {c.daysLeft}</p>
        <button className="delete-btn" onClick={onDelete}>X</button>
      </div>
    </div>

  );
};

export default TaskItem;



