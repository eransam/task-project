import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import AddTask from "../../TasksArea/AddTask/AddTask";
import AddTask2 from "../../TasksArea/AddTask2/AddTask2";
import TaskDetails from "../../TasksArea/TaskDetails/TaskDetails";
import TaskList from "../../TasksArea/TaskList/TaskList";
import UpdateTask from "../../TasksArea/UpdateTask/UpdateTask";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <Routes>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/home" element={<Home />} />

            <Route path="/tasks" element={<TaskList />} />


            {/* Route Parameter - the ":id" is the Route Parameter */}
            <Route path="/tasks/details/:id" element={<TaskDetails />} />

            {/* Handle Form: */}
            <Route path="/tasks/new" element={<AddTask />} />
            <Route path="/AddTask2" element={<AddTask2 />} />


            

            {/* Update Product */}
            <Route path="/tasks/edit/:id" element={<UpdateTask />} />

            <Route path="/about" element={<About />} />

            {/* Default route - first way: */}
            {/* <Route path="/" element={<Home />} /> */}

            {/* Default route - second way: */}
            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="*" element={<PageNotFound />} />

        </Routes>
    );
}

export default Routing;
