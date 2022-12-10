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
        formData.append("title", Task.title);
        formData.append("assigneeName", Task.assigneeName);
        formData.append("creationDate",Task.creationDate);
        formData.append("image", Task.image.item(0));
        formData.append("Description", Task.Description);
        formData.append("RelatedTickets", Task.RelatedTickets);
        formData.append("status", Task.status);
        
        console.log("formData in the task service: " , formData);
        
        // Post the new Task to the server: 
        const response = await axios.post<TaskModel>(config.taskUrl, formData);
        const addedTask = response.data;

        // Add to redux global state: 
        store.dispatch(addTaskAction(addedTask));

        return addedTask;
    }


    public async addNewTask2(Task: TaskModel): Promise<TaskModel> {
        // Convert out Task to FormData:
        
        const formData = new FormData();

        formData.append("title", "");
        formData.append("assigneeName", Task.assigneeName);
        formData.append("creationDate",Task.creationDate);
        formData.append("image", Task.image.item(0));


        formData.append("TaskID", Task.id.toString());
        formData.append("Description", Task.title);
        formData.append("RelatedTickets", Task.assigneeName);
        formData.append("status", Task.status);
        console.log("formData in the task service: " , formData);
        
        // Post the new Task to the server: 
        const response = await axios.post<TaskModel>("http://localhost:3001/api/tasks2/", formData);
        const addedTask = response.data;

        // Add to redux global state: 
        store.dispatch(addTaskAction(addedTask));

        return addedTask;
    }


    public async updateTask(Task: TaskModel): Promise<TaskModel> {
        
        // Convert out Task to FormData:
        const formData = new FormData();
        formData.append("id", Task.id.toString());
        formData.append("title", Task.title);
        formData.append("assigneeName", Task.assigneeName);
        formData.append("creationDate", Task.creationDate);
        formData.append("status", Task.status);
        formData.append("Description", Task.Description);
        formData.append("RelatedTickets", Task.RelatedTickets);
        formData.append("image", Task.image.item(0));
        // Put the new Task to the server: 
        const response = await axios.put<TaskModel>(config.taskUrl + Task.id, formData);
        const updatedTask = response.data;
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
        formData.append("title", Task.title);
        formData.append("assigneeName", Task.assigneeName);
        formData.append("creationDate", Task.creationDate);
        formData.append("status", Task.status);
        formData.append("Description", Task.Description);
        formData.append("RelatedTickets", Task.RelatedTickets);
        formData.append("imageName", Task.imageName);
        // Put the new Task to the server: 
        const response = await axios.post<TaskModel>("http://localhost:3001/api/tasks2/", formData);
        const updatedTask = response.data;
        // Add to redux global state: 
        store.dispatch(updateTaskAction(updatedTask));
        return updatedTask;
    }



    
}

const TaskService = new TasksService();

export default TaskService;