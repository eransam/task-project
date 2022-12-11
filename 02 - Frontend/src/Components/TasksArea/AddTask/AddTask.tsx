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
            const thedate = new Date;
            const stringDate = thedate.toString()
            Task.CreationDate= stringDate;

            console.log("task in submit in addtask: " , Task);
            

            await TasksService.addNewTask(Task);
            
            notify.success("Task has been added!");

            // Navigate back to all Tasks: 
            navigate("/AddTask2");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddTask Box">

            <form onSubmit={handleSubmit(submit)}>

                <h2>Add Task</h2>

                <label>Title: </label>
                <input type="text" {...register("Title", {
                    required: { value: true, message: "Missing Task Title" }
                })} />
                <span>{formState.errors.Title?.message}</span>


                <label>AssigneeName: </label>
                <input type="text" {...register("AssigneeName", {
                    required: { value: true, message: "Missing Task AssigneeName" }
                })} />
                <span>{formState.errors.AssigneeName?.message}</span>



                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddTask;
