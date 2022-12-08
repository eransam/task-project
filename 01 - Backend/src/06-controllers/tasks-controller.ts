import express, { NextFunction, Request, Response } from "express";
import TaskModel from "../03-models/task-model";
import logic from "../05-logic/tasks-logic";

const router = express.Router();

// router.get("/tasks", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const products = await logic.getAllProducts();
//         response.json(products);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

// router.get("/products/:id", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const id = +request.params.id;
//         const product = await logic.getOneProduct(id);
//         response.json(product);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

router.post("/tasks", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const task = new TaskModel(request.body);
        console.log("task in the task controller: " ,task);
        const addedTasks = await logic.addTask(task)
        response.status(201).json(addedTasks);
    }
    catch (err: any) {
        next(err);
    }
});

// router.put("/products/:id", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const id = +request.params.id;
//         request.body.id = id;
//         const product = new ProductModel(request.body);
//         const updatedProduct = await logic.updateFullProduct(product);
//         response.json(updatedProduct);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

// router.patch("/products/:id", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const id = +request.params.id;
//         request.body.id = id;
//         const product = new ProductModel(request.body);
//         const updatedProduct = await logic.updatePartialProduct(product);
//         response.json(updatedProduct);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

// router.delete("/products/:id", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const id = +request.params.id;
//         await logic.deleteProduct(id);
//         response.sendStatus(204);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

import path from "path";

// router.get("/products/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const imageName = request.params.imageName;
//         const absolutePath = path.join(__dirname, "..", "assets", "images", "products", imageName);
//         response.sendFile(absolutePath);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

export default router;