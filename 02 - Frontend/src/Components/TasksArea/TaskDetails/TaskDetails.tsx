import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TaskModel from "../../../Models/TaskModel";
import notify from "../../../Services/NotifyService";
import TasksService from "../../../Services/TaskService";
import config from "../../../Utils/Config";
import Loading from "../../SharedArea/Loading/Loading";
import "./TaskDetails.css";

function TaskDetails(): JSX.Element {

    // Get Route Parameter: 
    const params = useParams();
    const id = +params.id;

    // Create state for the task to display: 
    const [task, setTask] = useState<TaskModel>();

    // AJAX request that task:
    useEffect(() => {
        TasksService.getOneTask(id)
            .then(task => setTask(task))
            .catch(err => notify.error(err));
    }, []);

    const navigate = useNavigate();

    async function deleteTask() {
        try {

            // Are you sure message: 
            const confirmDelete = window.confirm("Are you sure?");
            if (!confirmDelete) return;

            // Delete this Task: 
            await TasksService.deleteOneTask(id);
            notify.success("Task deleted");

            navigate("/tasks");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="TaskDetails">

            <h2>Task Details</h2>

            {!task && <Loading />}

            {task &&
                <>
                    <h3>title: {task.title}</h3>
                    <h3>assigneeName: {task.assigneeName}</h3>
                    <h3>creationDate: {task.creationDate}</h3>
                    <h3>status: {task.status}</h3>

                    <img src={config.tasksImageUrl + task.imageName} />

                    <br />

                    {/* Navigate Back: */}
                    {/* <NavLink to="/tasks">Back</NavLink> */}

                    {/* Navigate Back: */}
                    <button onClick={() => navigate(-1)}>Back</button>
                    <button onClick={() => navigate("/tasks/edit/" + task.id)}>Edit</button>
                    <button onClick={deleteTask}>Delete</button>
                </>
            }

        </div>
    );
}

export default TaskDetails;
