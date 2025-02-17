import React, { useState, useEffect } from "react";
import "./TaskItem.css";

type TaskItemProps = {
  task: {
    task_id: string;
    taskbody: string;
    timecreated: string;
    timeout: string;
    iscomplete: boolean;
    isrelevant: boolean;
  };
  onDelete: () => void;
  onComplete: () => void;
  onrelevant: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onComplete, onrelevant }) => {
  const [isCompleted, setIsCompleted] = useState(task.iscomplete);
  const [isRelevantd, setIsR] = useState(task.isrelevant);
  const [time, setime] = useState("");

  useEffect(() => {
    setIsR(task.isrelevant);
  }, [task.isrelevant]);

  const hendeletime = (task: { timeout: string; timecreated: string, iscomplete: boolean }) => {
    const timeoutDate = new Date(task.timeout);
    const createdDate = new Date(task.timecreated);
    const now = new Date();


    const timeDifferenceMs = timeoutDate.getTime() - now.getTime();


    const timeDifferencedays = (Math.floor((timeDifferenceMs / (1000 * 60 * 60 * 24))) + 1);



    const t = timeDifferencedays.toString();

    let classname = "task-card2";

    if (timeDifferencedays <= 0 && !task.iscomplete) {
      classname = "warning";  
    } else if (timeDifferencedays <= 1 && !task.iscomplete) {
      classname = "prewarning"; 
    }

    const finael = 'days to finish:' + t;
    return {
      daysLeft: `Days to finish: ${timeDifferencedays}`,
      classname,
    };
  }

  const c = hendeletime(task);
  const d = task.iscomplete;
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
        <button className="relevant-btn" onClick={() => { onrelevant(); }}>→→</button>
      </div>
    </div>

  );
};

export default TaskItem;



