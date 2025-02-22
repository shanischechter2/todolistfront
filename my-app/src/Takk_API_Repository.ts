const API_URL = "http://localhost:5000";

export class Api_task_repository {
    static async gettasks() {
        try {
            const res = await fetch(`${API_URL}/getalltasksbyuser`, {//kovez nifrad
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error(`Server Error: ${res.status}`);
            }

            const data = await res.json();
            return data;
            // setTasks(data.filter((task) => !showRelevant ? !task.isrelevant : task.isrelevant));
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }

    }
    static async delete_task(task: { task_id: string }) {
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

            const data = await res.json();
            return data;

        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }
    static async update_complete_for_task(task: { task_id: string, iscomplete: boolean }) {
        try {
            const isComplete = !task.iscomplete;
            const res = await fetch(`${API_URL}/updatecheck/${task.task_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ isComplete }),


            });

            if (!res.ok) {
                throw new Error(`Server Error: ${res.status}`);
            }

            const data = await res.json();
             return data;
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }
    static async update_relevent_for_task(task: { task_id: string; isrelevant: boolean }) {
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
             // setTasks((prevTasks) => [...prevTasks]);
             const data = await res.json();
             return data;
            } catch (error) {
              console.error("Error updating relevance:", error);
            }
            
    }
    static async adding_task(taskbody: string, Timeout: string ) {
        try {
            const formatDate = (date: Date) => {
                return date.toISOString().split("T")[0];
              };
              
              const selectedTimeOut = Timeout || formatDate(new Date());
          
              const res = await fetch(`${API_URL}/addtask`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ taskbody, timeOut : selectedTimeOut }),
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
}