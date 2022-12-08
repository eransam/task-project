import { OkPacket } from "mysql";
import { BAD_REQUEST } from "../01-utils/status-codes";
import ErrorModel from "../03-models/error-model";
import TaskModel from "../03-models/task-model";
import dal from "../04-dal/dal";
import { v4 as uuid } from "uuid";


async function getAllTasks(): Promise<TaskModel[]> {
    const sql = `SELECT
                    TaskID AS id,
                    Title AS Title,
                    AssigneeName AS assigneeName,
                    CreationDate AS creationDate,
                    CONCAT(TaskID, '.jpg') AS imageName 
                    FROM tasks`;

    const tasks = await dal.execute(sql);
    return tasks;
}

async function getOneTask(id: number): Promise<TaskModel> {
    const sql = `SELECT 
                    TaskID AS id,
                    Title AS Title,
                    AssigneeName AS assigneeName,
                    CreationDate AS creationDate,
                    CONCAT(TaskID, '.jpg') AS imageName 
                    FROM tasks
                    WHERE TaskID = ${id}`;

    const tasks = await dal.execute(sql);

    const task = tasks[0];

    if(!task) throw new ErrorModel(404, `id ${id} not found`);

    return task;
}

async function addTask(task: TaskModel): Promise<TaskModel> {
    console.log("task: " ,task);

    const errors = task.validatePost();
    if (errors) throw new ErrorModel(BAD_REQUEST, errors);
    // if (errors) throw new ErrorModel(StatusCode.BadRequest, errors);
    
    if (task.image) {
        const extension = task.image.name.substring(
            task.image.name.lastIndexOf(".")
        );
        task.imageName = uuid() + extension;
            console.log("task.imageName: " , task.imageName);
            
        await task.image.mv(
          "./src/assets/images/tasks/" + task.imageName);
        delete task.image;
      }


    const sql = `INSERT INTO tasks(Title, AssigneeName, CreationDate, Status)
                 VALUES('${task.title}','${task.assigneeName}','${task.creationDate}','${task.status}')`;

    const info: OkPacket = await dal.execute(sql);
    task.id = info.insertId;

    return task;
}

async function updateFullTask(task: TaskModel): Promise<TaskModel> {

    const errors = task.validatePut();
    if (errors) throw new ErrorModel(400, errors);

    const sql = `UPDATE tasks SET
                 Title = '${task.title}',
                 AssigneeName = ${task.assigneeName},
                 CreationDate = ${task.creationDate}
                 Status = ${task.status}
                 WHERE TaskID = ${task.id}`;

    const info: OkPacket = await dal.execute(sql);

    if(info.affectedRows === 0) throw new ErrorModel(404, `id ${task.id} not found`);

    return task;
}

async function updatePartialTask(task: TaskModel): Promise<TaskModel> {

    const errors = task.validatePatch();
    if (errors) throw new ErrorModel(400, errors);

    const dbTask = await getOneTask(task.id);

    for(const prop in task) {
        if(task[prop] !== undefined) {
            dbTask[prop] = task[prop];
        }
    }

    const updatedTask = await updateFullTask(new TaskModel(dbTask));

    return updatedTask;
}

async function deleteTask(id: number): Promise<void> {

    const sql = `DELETE FROM tasks WHERE TaskID = ${id}`;

    const info: OkPacket = await dal.execute(sql);

    if(info.affectedRows === 0) throw new ErrorModel(404, `id ${id} not found`);
}

export default {
    getAllTasks,
    getOneTask,
    addTask,
    updateFullTask,
    updatePartialTask,
    deleteTask
};
