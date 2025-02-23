import React, { createContext, useContext, useEffect, useState } from "react";
import { Api_task_repository } from "./Takk_API_Repository";
import { TaskItemProps as Task } from "./task";

type TaskContextType = {
  tasks: Task[];
  showRelevant: boolean;
  taskbody: string;
  TimeOut: string;
  setTaskBody: (taskbody: string) => void;
  setTimeOut: (timeout: string) => void;
  addTask: () => Promise<void>;
  toggleRelevance: (isRelevant: boolean) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
  completeTask: (task: Task) => Promise<void>;
  toggleTaskRelevance: (task: Task) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showRelevant, setShowRelevant] = useState(true);
  const [taskbody, setTaskBody] = useState("");
  const [TimeOut, setTimeOut] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await Api_task_repository.gettasks();
      if (response.error) {
        alert(response.error);
        return;
      }
      setTasks(response);
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (taskbody.trim() === "") {
      alert("The task is empty");
      return;
    }

    const date_tape = new Date(TimeOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date_tape < today) {
      alert("You can't select a past date for a task");
      return;
    }

    try {
      const response = await Api_task_repository.adding_task(taskbody, TimeOut);
  
      if (response.error) {
        alert(response.error);
        return;
      }

      const newTask: Task = {
        task_id: response.task_id,
        taskbody,
        timecreated: response.timecreated || new Date().toISOString(),
        timeout: response.timeout || TimeOut || new Date().toISOString(),
        iscomplete: response.isComplete || false,
        isrelevant: response.isRelevant || true,
      };

      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setTaskBody(""); 
      setTimeOut(""); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleRelevance = async (isRelevant: boolean) => {
    setShowRelevant(isRelevant);
    const response = await Api_task_repository.gettasks();
    if (response.error) {
      alert(response.error);
      return;
    }
    setTasks(response);
  };

  const deleteTask = async (task: Task) => {
    const response = await Api_task_repository.delete_task(task);
    if (response.error) {
      alert(response.error);
      return;
    }
    setTasks((prevTasks) => prevTasks.filter((t) => t.task_id !== task.task_id));
  };

  const completeTask = async (task: Task) => {
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

  const toggleTaskRelevance = async (task: Task) => {
    const confirmed = window.confirm("Are you sure you want to move this task?");
    if (confirmed) {
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
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        showRelevant,
        taskbody,
        TimeOut,
        setTaskBody,
        setTimeOut,
        addTask,
        toggleRelevance,
        deleteTask,
        completeTask,
        toggleTaskRelevance,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
