import { NavLink } from "react-router-dom";
import TaskModel from "../../../Models/TaskModel";
import config from "../../../Utils/Config";
import "./TaskCard.css";

interface TaskCardProps {
    task: TaskModel;
}

function TaskCard(props: TaskCardProps): JSX.Element {
    return (
        <div className="TaskCard Box">
            <div>
                {props.task.title}
                <br />
                assigneeName: {props.task.assigneeName}
                <br />
                creationDate: {props.task.creationDate}
                <br />
                status: {props.task.status}
                <br />

            </div>
            <div>
                <NavLink to={"/tasks/details/" + props.task.id}>
                    <img src={config.tasksImageUrl + props.task.imageName} />
                </NavLink>
            </div>
        </div>
    );
}

export default TaskCard;
