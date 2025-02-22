import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { TaskItemProps as Task } from "./task"; // ✅ Import Task type

// ✅ Define State Type
interface AppState {
  tasks: Task[];
  isRelevant: boolean;
  email: string;
  password: string;
  username: string;
  taskbody: string;
  timeout: string;
}

// ✅ Define Actions
type AppAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_COMPLETE"; payload: string }
  | { type: "TOGGLE_RELEVANCE"; payload: string }
  | { type: "SET_RELEVANT"; payload: boolean }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_TASKBODY"; payload: string }
  | { type: "SET_TIMEOUT"; payload: string };

// ✅ Initial State
const initialState: AppState = {
  tasks: [],
  isRelevant: true,
  email: "",
  password: "",
  username: "",
  taskbody: "",
  timeout: "",
};

// ✅ Reducer Function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [action.payload, ...state.tasks], taskbody: "", timeout: "" };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((task) => task.task_id !== action.payload) };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.task_id === action.payload ? { ...task, iscomplete: !task.iscomplete } : task
        ),
      };
    case "TOGGLE_RELEVANCE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.task_id === action.payload ? { ...task, isrelevant: !task.isrelevant } : task
        ),
      };
    case "SET_RELEVANT":
      return { ...state, isRelevant: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_TASKBODY":
      return { ...state, taskbody: action.payload };
    case "SET_TIMEOUT":
      return { ...state, timeout: action.payload };
    default:
      return state;
  }
};

// ✅ Create Context
const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<AppAction> } | undefined>(undefined);

// ✅ Provide Context
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

// ✅ Custom Hook to Use Context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
