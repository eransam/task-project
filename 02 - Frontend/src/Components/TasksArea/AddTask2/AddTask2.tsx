import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TaskModel from "../../../Models/TaskModel";
import notify from "../../../Services/NotifyService";
import TasksService from "../../../Services/TaskService";
import config from "../../../Utils/Config";
import "./AddTask2.css";

function AddTask2(): JSX.Element {


        // Create tasks state: 
        const [tasks, settasks] = useState<TaskModel[]>([]);
        const [lastElement, setLastElement] = useState<TaskModel[]>([]);

        // Do side-effect once: 
        useEffect(() => {
            TasksService.fetchTasks()
                .then(tasks => setLastElement(tasks.slice(-1)))
                .catch(err => notify.error(err));
        }, []);

        console.log("lastElement: " ,lastElement[0]);
        
    const { register, handleSubmit, formState } = useForm<TaskModel>();

    const navigate = useNavigate();

    async function submit(Task: TaskModel) {
        try {
            const thedate = new Date;
             const stringDate = thedate.toString()
             Task.creationDate= stringDate;
             console.log("stringDate: " ,stringDate);
             console.log("Task.creationDate: " ,Task.creationDate);

            console.log("lastElement[0] in the submit: " , lastElement[0]);
            const choseElement = lastElement[0];
            console.log("choseElement.assigneeName" ,choseElement.assigneeName);
            Task.id = choseElement.id;
            Task.assigneeName = choseElement.assigneeName;
            Task.imageName =choseElement.imageName;
            Task.title = choseElement.title;
            console.log("Task: " ,Task);
            

            await TasksService.updateTask2(Task);
            
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


                <label>status: </label>
                <input type="text" {...register("status", {
                    required: { value: true, message: "Missing Task status" }
                })} />
                <span>{formState.errors.status?.message}</span>

                <label>Description: </label>
                <input type="text" {...register("Description", {
                    required: { value: true, message: "Missing Task Description" }
                })} />
                <span>{formState.errors.Description?.message}</span>


                <label>RelatedTickets: </label>
                <input type="text" {...register("RelatedTickets", {
                    required: { value: true, message: "Missing Task RelatedTickets" }
                })} />
                <span>{formState.errors.RelatedTickets?.message}</span>




                <button>Add</button>

            </form>

        </div>
    );
}

export default AddTask2;
