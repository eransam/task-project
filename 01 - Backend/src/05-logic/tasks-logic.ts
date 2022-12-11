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
                    AssigneeName,
                    CreationDate,
                    RelatedTickets,
                    Description,
                    imageName
                    FROM tasks`;

    const tasks = await dal.execute(sql);
    return tasks;
}

async function getOneTask(id: number): Promise<TaskModel> {
    const sql = `SELECT 
                    TaskID,
                    Title,
                    AssigneeName,
                    CreationDate,
                    RelatedTickets,
                    Description,
                    imageName 
                    FROM tasks
                    WHERE TaskID = ${id}`;

    const tasks = await dal.execute(sql);

    const task = tasks[0];

    if(!task) throw new ErrorModel(404, `id ${id} not found`);

    return task;
}

async function addTask(task: TaskModel): Promise<TaskModel> {
    console.log("task: " ,task);
    task.image;
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


    const sql = `INSERT INTO tasks(Title, AssigneeName, CreationDate, Status,RelatedTickets,Description,imageName)
                 VALUES('${task.Title}','${task.AssigneeName}','${task.CreationDate}','${task.Status}','${task.RelatedTickets}','${task.Description}','${task.imageName}')`;

    const info: OkPacket = await dal.execute(sql);
    task.id = info.insertId;

    return task;
}

async function updateFullTask(task: TaskModel): Promise<TaskModel> {

    const errors = task.validatePut();
    if (errors) throw new ErrorModel(400, errors);
    console.log("we in the updateFullTask");
    

    if (task.image) {
        console.log("PUT. Have image! logic");
        const extension = task.image.name.substring(
            task.image.name.lastIndexOf(".")
        );
        task.imageName = uuid() + extension;
        await task.image.mv(
          "./src/assets/images/tasks/" + task.imageName
        );
        delete task.image;
      }



      console.log("task in the updateFullTask in task logic: " , task);
      
    const sql = `UPDATE tasks SET
                 Title = '${task.Title}',
                 AssigneeName = '${task.AssigneeName}',
                 Description = '${task.Description}',
                 RelatedTickets = '${task.RelatedTickets}',
                 imageName = '${task.imageName}',
                 Status = '${task.Status}'
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
