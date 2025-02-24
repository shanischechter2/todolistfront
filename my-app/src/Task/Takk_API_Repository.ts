
import { Task} from "./task";

const API_URL = "http://localhost:5000";

export const Api_task_repository ={
     async gettasks() {
        try {
            const res = await fetch(`${API_URL}/getalltasksbyuser`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error(`Server Error: ${res.status}`);
            }

            const data = await res.json();
            return data;
          
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }

    },
     async delete_task(task: Pick<Task,"task_id">) {
        try {
            const res = await fetch(`${API_URL}/deletetask/${task.task_id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ task: task.task_id }),

            });

            if (!res.ok) {
                throw new Error(`Server Error: ${res.status}`);
            }

            const data = await res.json() ;
            return data;

        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    },
     async update_complete_for_task(task:  Pick<Task,"task_id"|"iscomplete">) {
        try {
            console.log(task.iscomplete);
            const iscomplete = !task.iscomplete;
            const res = await fetch(`${API_URL}/updatecheck/${task.task_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ iscomplete }),


            });

            if (!res.ok) {
                throw new Error(`Server Error: ${res.status}`);
            }

            const data = await res.json();
             return data;
        } catch (error) {
            console.error("Error updating task:", error);
        }
    },
     async update_relevent_for_task(task: Pick<Task,"task_id"|"isrelevant">) {
        try {
            const res = await fetch(`${API_URL}/updatrelevant/${task.task_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({isrelevant: !task.isrelevant}),
              });
        
              
              if (!res.ok) { 
                throw new Error(`Server Error: ${res.status}`);
              }
         
             const data = await res.json();
             return data;
            } catch (error) {
              console.error("Error updating relevance:", error);
            }
            
    },
    async adding_task(task: Pick<Task,"taskbody"|"timeout"> ) {
        try {
                  
              const selectedTimeOut = task.timeout || new Date();
              
              const res = await fetch(`${API_URL}/addtask`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ taskbody:task.taskbody, timeout : selectedTimeOut }),
              });
              if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server Error: ${res.status} - ${errorText}`);
              }
             
              const data = await res.json();
            return data;
            
    }
    catch (error) {
        console.error("Error adding task:", error);
      }
    }
};