import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TaskModel from "../../../Models/TaskModel";
import notify from "../../../Services/NotifyService";
import TasksService from "../../../Services/TaskService";
import config from "../../../Utils/Config";
import "./AddTask.css";

function AddTask(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<TaskModel>();

    const navigate = useNavigate();

    async function submit(Task: TaskModel) {
        try {

            console.log("Task: " ,Task);
            
            await TasksService.addNewTask(Task);
            
            notify.success("Task has been added!");

            // Navigate back to all Tasks: 
            navigate("/Tasks");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddTask Box">

            <form onSubmit={handleSubmit(submit)}>

                <h2>Add Task</h2>

                <label>title: </label>
                <input type="text" {...register("title", {
                    required: { value: true, message: "Missing Task title" }
                })} />
                <span>{formState.errors.title?.message}</span>


                <label>assigneeName: </label>
                <input type="text" {...register("assigneeName", {
                    required: { value: true, message: "Missing Task assigneeName" }
                })} />
                <span>{formState.errors.assigneeName?.message}</span>





                <label>creationDate: </label>
                <input type="text" {...register("creationDate", {
                    required: { value: true, message: "Missing Task creationDate" }
                })} />
                <span>{formState.errors.creationDate?.message}</span>




                <label>status: </label>
                <input type="text" {...register("status", {
                    required: { value: true, message: "Missing Task status" }
                })} />
                <span>{formState.errors.status?.message}</span>


                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddTask;
