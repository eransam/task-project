import axios from "axios";
import TaskModel from "../Models/TaskModel";
import { addTaskAction, deleteTaskAction, fetchTasksAction, updateTaskAction } from "../Redux/TasksState";
import store from "../Redux/Store";
import config from "../Utils/Config";

class TasksService {

    public async fetchTasks(): Promise<TaskModel[]> {
        if(store.getState().tasksState.Tasks.length === 0) {
            const response = await axios.get<TaskModel[]>(config.taskUrl);
            const Tasks = response.data;
            store.dispatch(fetchTasksAction(Tasks));
        }
        return store.getState().tasksState.Tasks;
    }

    public async getOneTask(id: number): Promise<TaskModel> {
        let Task = store.getState().tasksState.Tasks.find(p => p.id === id);
        console.log("Task in the taskservide: " , Task);
        
        if(!Task) {
            const response = await axios.get<TaskModel>(config.taskUrl + id);
            Task = response.data;
        }
        return Task;
    }

    public async deleteOneTask(id: number): Promise<void> {
        await axios.delete(config.taskUrl + id);
        store.dispatch(deleteTaskAction(id));
    }

    public async addNewTask(Task: TaskModel): Promise<TaskModel> {
        // Convert out Task to FormData:
        
        const formData = new FormData();
        formData.append("Title", Task.Title);
        formData.append("AssigneeName", Task.AssigneeName);
        formData.append("CreationDate",Task.CreationDate);
        formData.append("image", Task.image.item(0));
        // formData.append("Description", Task.Description);
        // formData.append("RelatedTickets", Task.RelatedTickets);
        // formData.append("status", Task.status);
        
        console.log("formData in the task service: " , formData);
        
        // Post the new Task to the server: 
        const response = await axios.post<TaskModel>(config.taskUrl, formData);
        const addedTask = response.data;
        console.log("addedTask22: " , addedTask);
        
        // Add to redux global state: 
        store.dispatch(addTaskAction(addedTask));

        return addedTask;
    }


    public async addNewTask2(Task: TaskModel): Promise<TaskModel> {
        // Convert out Task to FormData:
        
        const formData = new FormData();

        formData.append("Title", "");
        formData.append("AssigneeName", Task.assigneeName);
        formData.append("CreationDate",Task.creationDate);
        formData.append("image", Task.image.item(0));
        formData.append("TaskID", Task.id.toString());
        formData.append("Description", Task.title);
        formData.append("RelatedTickets", Task.assigneeName);
        formData.append("Status", Task.status);
        console.log("formData in the task service: " , formData);
        
        // Post the new Task to the server: 
        const response = await axios.post<TaskModel>("http://localhost:3001/api/tasks2/", formData);
        const addedTask = response.data;

        // Add to redux global state: 
        store.dispatch(addTaskAction(addedTask));

        return addedTask;
    }


    public async updateTask(Task: TaskModel): Promise<TaskModel> {
        console.log("Task in updatetask in taskservice: " , Task);
        
        // Convert out Task to FormData:
        const formData = new FormData();
        formData.append("id", Task.TaskID.toString());
        formData.append("Title", Task.title);
        formData.append("AssigneeName", Task.assigneeName);
        formData.append("CreationDate", Task.creationDate);
        formData.append("Status", Task.status);
        formData.append("Description", Task.description);
        formData.append("RelatedTickets", Task.relatedTickets);
        formData.append("image", Task.image.item(0));
        // Put the new Task to the server: 
        const response = await axios.put<TaskModel>(config.taskUrl + Task.TaskID, formData);
        console.log("response: " , response);
        
        const updatedTask = response.data;

        console.log("updatedTask 222:" ,updatedTask);
        
        // Add to redux global state: 
        store.dispatch(updateTaskAction(updatedTask));
        return updatedTask;
    }



    public async updateTask2(Task: TaskModel): Promise<TaskModel> {
        console.log("Task in updateTask in  task service: " , Task);
        // console.log("Task.image: " , Task.image);

        // console.log("Task.image.item(0): " , Task.image.item(0));

        
        // Convert out Task to FormData:
        const formData = new FormData();
        formData.append("id", Task.id.toString());
        formData.append("Title", Task.title);
        formData.append("AssigneeName", Task.assigneeName);
        formData.append("CreationDate", Task.creationDate);
        formData.append("Status", Task.status);
        formData.append("Description", Task.Description);
        formData.append("RelatedTickets", Task.RelatedTickets);
        formData.append("imageName", Task.imageName);
        // Put the new Task to the server: 
        const response = await axios.post<TaskModel>("http://localhost:3001/api/tasks2/", formData);
        const updatedTask = response.data;
        // Add to redux global state: 
        console.log("updatedTask: " , updatedTask);
        
        store.dispatch(updateTaskAction(updatedTask));
        return updatedTask;
    }



    
}

const TaskService = new TasksService();

export default TaskService;