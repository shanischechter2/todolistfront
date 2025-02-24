import React, { createContext, useContext, useEffect, useState } from "react";
import { Api_task_repository } from "./Takk_API_Repository";
import { Task } from "./task";
import { task_object } from "./addingTaskfun";

type TaskContextType = {
  tasks: Task[];
  showRelevant: boolean;
  taskbody: Task["taskbody"];
  timeout: Task["timeout"]; 
  setTaskBody: (taskbody: Task["taskbody"]) => void;
  setTimeout: (timeout: Task["timeout"]) => void;
  addTask: () => Promise<void>;
  toggleRelevance: (isRelevant: boolean) => Promise<void>;
  deleteTask: (task: Pick<Task, "task_id">) => Promise<void>;
  completeTask: (task: Pick<Task, "task_id" | "iscomplete">) => Promise<void>;
  toggleTaskRelevance: (task: Pick<Task, "task_id" | "isrelevant">) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showRelevant, setShowRelevant] = useState(true);
  const [taskbody, setTaskBody] = useState<Task["taskbody"]>("");
  const [timeout, setTimeout] = useState<Task["timeout"]>(new Date());

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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (timeout < today) {
      alert("You can't select a past date for a task");
      return;
    }

    try {
      const response = await Api_task_repository.adding_task({ taskbody, timeout }) as Task;
      if (!response || "error" in response) {
        alert(response.error);
        return;
      }

      const newTask = task_object({ taskbody, timeout, task_id: response.task_id }) as Task;
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setTaskBody("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleRelevance = async (isRelevant: boolean) => {
    setShowRelevant(isRelevant);
    const response = await Api_task_repository.gettasks() as Task[];
    if (!response || "error" in response) {
      alert(response.error);
      return;
    }
    setTasks(response);
  };

  const deleteTask = async (task: Pick<Task, "task_id">) => {
    const response = await Api_task_repository.delete_task(task);
    if (response.error) {
      alert(response.error);
      return;
    }
    setTasks((prevTasks) => prevTasks.filter((t) => t.task_id !== task.task_id));
  };

  const completeTask = async (task: Pick<Task, "task_id" | "iscomplete">) => {
    const updatedTask = { task_id: task.task_id, iscomplete: !task.iscomplete };

    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.task_id === task.task_id ? { ...t, iscomplete: !t.iscomplete } : t
      )
    );

    const response = await Api_task_repository.update_complete_for_task(task);
    if (response.error) {
      alert(response.error);
      return;
    }
  };

  const toggleTaskRelevance = async (task: Pick<Task, "task_id" | "isrelevant">) => {
    const confirmed = window.confirm("Are you sure you want to move this task?");
    if (confirmed) {
      const updatedTask = { task_id: task.task_id, isrelevant: !task.isrelevant };

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
        timeout,
        setTaskBody,
        setTimeout,
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
