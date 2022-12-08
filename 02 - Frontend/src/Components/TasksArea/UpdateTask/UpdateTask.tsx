import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import TaskModel from "../../../Models/TaskModel";
import notify from "../../../Services/NotifyService";
import tasksService from "../../../Services/TaskService";
import "./UpdateTask.css";

function UpdateTask(): JSX.Element {

    const params = useParams();
    const id = +params.id;

    const navigate = useNavigate();

    const { register, handleSubmit, formState, setValue } = useForm<TaskModel>();

    useEffect(() => {
        tasksService.getOneTask(id)
            .then(task => {
                setValue("title", task.title);
                setValue("assigneeName", task.assigneeName);
                setValue("creationDate", task.creationDate);
                setValue("status", task.status);

            })
            .catch(err => notify.error(err));
    }, []);

    async function submit(task: TaskModel) {
        try {

            task.id = id;
            await tasksService.updateTask(task);

            notify.success("Task updated.");

            // Navigate back to all tasks: 
            navigate("/tasks");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="UpdateTask Box">

            <form onSubmit={handleSubmit(submit)}>

                <h2>Edit Task</h2>

                <label>title: </label>
                <input type="text" {...register("title", {
                    required: { value: true, message: "Missing task title" }
                })} />
                <span>{formState.errors.title?.message}</span>

                <label>assigneeName: </label>
                <input type="text" {...register("assigneeName", {
                    required: { value: true, message: "Missing task assigneeName" }
                })} />
                <span>{formState.errors.assigneeName?.message}</span>


                <label>creationDate: </label>
                <input type="text" {...register("creationDate", {
                    required: { value: true, message: "Missing task creationDate" }
                })} />
                <span>{formState.errors.creationDate?.message}</span>

                <label>status: </label>
                <input type="text" {...register("status", {
                    required: { value: true, message: "Missing task status" }
                })} />
                <span>{formState.errors.status?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Update</button>

            </form>

        </div>
    );
}

export default UpdateTask;
