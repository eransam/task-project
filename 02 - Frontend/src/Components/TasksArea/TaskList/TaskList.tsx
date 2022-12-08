import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import taskModel from "../../../Models/TaskModel";
import notify from "../../../Services/NotifyService";
import tasksService from "../../../Services/TaskService";
import Loading from "../../SharedArea/Loading/Loading";
import TaskCard from "../TaskCard/TaskCard";
import "./TaskList.css";

function TaskList(): JSX.Element {

    // Create tasks state: 
    const [tasks, settasks] = useState<taskModel[]>([]);

    // Do side-effect once: 
    useEffect(() => {
        tasksService.fetchTasks()
            .then(tasks => settasks(tasks))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="taskList">

            {tasks.length === 0 && <Loading />}

            <NavLink to="/tasks/new">➕</NavLink>

            {tasks.map(p => <TaskCard key={p.id} task={p} />)}

        </div>
    );
}

export default TaskList;
