import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import TaskModel from "../../../Models/TaskModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import tasksService from "../../../Services/TaskService";
import "./UpdateTask.css";

function UpdateTask(): JSX.Element {

    const [user, setUser] = useState<any>(store.getState().authState.user);
    const [lastElement, setLastElement] = useState<TaskModel[]>([]);

    const params = useParams();
    const id = +params.id;
    console.log("params: " , params);
    
    var imgName:string = "";

    const navigate = useNavigate();

    const { register, handleSubmit, formState, setValue } = useForm<TaskModel>();

    useEffect(() => {
        tasksService.getOneTask(id)
            .then(task => {
                console.log("task.Title123: " , task);
                
                imgName = task.imageName;
                setValue("title", task.Title);
                setValue("assigneeName", task.AssigneeName);
                setValue("creationDate", task.CreationDate);
                setValue("status", task.Status);
                setValue("relatedTickets", task.RelatedTickets);
                setValue("description", task.Description);


                const unsubscribe = store.subscribe(() => {
                    setUser(store.getState().authState.user);
                  });
            
                  return () => {
                    unsubscribe();
                  };
            })
            .catch(err => notify.error(err));
    }, []);

    async function submit(task: TaskModel) {
        try {
            
            task.TaskID = id;

            console.log("task in submit in updatetask: " , task);

            const updatedTask =  await tasksService.updateTask(task);

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

                <label>description: </label>
                <input type="text" {...register("description", {
                    required: { value: true, message: "Missing task description" }
                })} />
                <span>{formState.errors.description?.message}</span>

                <label>relatedTickets: </label>
                <input type="text" {...register("relatedTickets", {
                    required: { value: true, message: "Missing task relatedTickets" }
                })} />
                <span>{formState.errors.relatedTickets?.message}</span>


                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Update</button>
                <button onClick={() => navigate(-1)}>Back</button>


            </form>

        </div>
    );
}

export default UpdateTask;
