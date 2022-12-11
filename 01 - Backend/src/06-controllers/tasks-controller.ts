import express, { NextFunction, Request, Response } from "express";
import TaskModel from "../03-models/task-model";
import logic from "../05-logic/tasks-logic";

const router = express.Router();

router.get("/tasks", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await logic.getAllTasks();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/tasks/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const product = await logic.getOneTask(id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/tasks", async (request: Request, response: Response, next: NextFunction) => {
    try {

        request.body.image = request.files?.image;

        const task = new TaskModel(request.body);
        console.log("task in the task controller: " ,task);

        const addedTasks = await logic.addTask(task)

        console.log("addedTasks in controller: " , addedTasks);
        
        response.status(201).json(addedTasks);
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/tasks2", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const task = new TaskModel(request.body);
        console.log("task2 in the task controller: " ,task);
        const addedTasks = await logic.updateFullTask(task)

        console.log("addedTasks: " , addedTasks);

        response.status(201).json(addedTasks);
    }
    catch (err: any) {
        next(err);
    }
});




router.put("/tasks/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log("eransma");
        const id = +request.params.id;
        request.body.id = id;
        request.body.image = request.files?.image;
        console.log("request.body: " ,request.body);
        
        const task = new TaskModel(request.body);
        console.log("eransma task: " , task);

        const updatedTask = await logic.updateFullTask(task);
        console.log("updatedTask555: " , updatedTask);
        
        response.json(updatedTask);
    }
    catch (err: any) {
        next(err);
    }
});

router.patch("/tasks/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.id = id;
        const product = new TaskModel(request.body);
        const updatedProduct = await logic.updatePartialTask(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/tasks/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await logic.deleteTask(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

import path from "path";

router.get("/tasks/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "assets", "images", "tasks", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;