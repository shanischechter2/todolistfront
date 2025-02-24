
import { Task} from './task';


export function task_object(
    task: Pick<Task, "taskbody" | "timeout"|"task_id">,
    
  ) {
    return {
      task_id:task.task_id,
      taskbody: task.taskbody,
      timecreated: new Date(),
      timeout: task.timeout,
      iscomplete: false,
      isrelevant: true,
    } as Omit<Task, "user_id">;
  }