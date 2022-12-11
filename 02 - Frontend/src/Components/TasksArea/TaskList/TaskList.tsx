import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import taskModel from "../../../Models/TaskModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import tasksService from "../../../Services/TaskService";
import Loading from "../../SharedArea/Loading/Loading";
import TaskCard from "../TaskCard/TaskCard";
import "./TaskList.css";

function TaskList(): JSX.Element {
    const navigate = useNavigate();

    // Create tasks state: 
    const [tasks, settasks] = useState<taskModel[]>([]);
    const [user, setUser] = useState<any>("null");

    // Do side-effect once: 
    useEffect(() => {
        try {
        tasksService.fetchTasks()
            .then(tasks => settasks(tasks))
            setUser(store.getState().authState.user);

            const unsubscribe = store.subscribe(() => {
                settasks(store.getState().tasksState.Tasks);
                setUser(store.getState().authState.user);
              });

              return () => {
                unsubscribe();
              };

            } catch (error) {
            
            }

    }, []);

    return (
        <div className="taskList">

            {tasks.length === 0 && <Loading />}

            <NavLink to="/tasks/new">➕</NavLink>
            {console.log("tasks in list: " , tasks)}
            {tasks.map(p => <TaskCard key={p.id} task={p} />)}

        </div>
    );
}

export default TaskList;
