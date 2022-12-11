import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TaskModel from "../../../Models/TaskModel";
import store from "../../../Redux/Store";
import config from "../../../Utils/Config";
import "./TaskCard.css";
import tasksService from "../../../Services/TaskService";
import notify from "../../../Services/NotifyService";

interface TaskCardProps {
    task: TaskModel;
}

function TaskCard(props: TaskCardProps): JSX.Element {
    const [user, setUser] = useState<any>(store.getState().authState.user);
    const [tasks, settasks] = useState<TaskModel[]>([]);
    const [erer, setErer] = useState<string>("");


    useEffect(() => {
        tasksService.fetchTasks()
            .then(tasks => settasks(tasks))
            .catch(err => notify.error(err));   


            const unsubscribe = store.subscribe(() => {
                setUser(store.getState().authState.user);
                settasks(store.getState().tasksState.Tasks);
              });
        
              return () => {
                unsubscribe();
              };


    }, []);





    
    return (
        <div className="TaskCard Box">
            {console.log("props.task: " , props.task)}
            <div>
                title: {props.task.Title}
                <br />
                assigneeName: {props.task.AssigneeName}
                <br />
                creationDate: {props.task.CreationDate}
                <br />
                description: {props.task.Description}
                <br />
                status: {props.task.Status}
                <br />
                relatedTickets: {props.task.RelatedTickets}
                <br />

            </div>
            <div>
                {console.log("props.task in task card: " , props.task.id)}
                <NavLink to={"/tasks/details/" + props.task.id}>
                    <img src={config.tasksImageUrl + props.task.imageName} width="450px" height="450px" />
                </NavLink>
            </div>
        </div>
    );
}

export default TaskCard;
