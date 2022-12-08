import TaskModel from "../Models/TaskModel";

// Tasks State - Tasks data needed in the application level:
export class TasksState {
    public Tasks: TaskModel[] = [];
}

// Tasks Action Type - any action which can be done on the above Tasks state:
export enum TasksActionType {
    FetchTasks = "FetchTasks",
    AddTask = "AddTask",
    UpdateTask = "UpdateTask",
    DeleteTask = "DeleteTask"
}

// Tasks Action - any single object sent to the store during "dispatch":
export interface TasksAction {
    type: TasksActionType;
    payload: any;
}

// Tasks Action Creators - function for creating TasksAction objects. each function creates one Action object:
export function fetchTasksAction(Tasks: TaskModel[]): TasksAction {
    return { type: TasksActionType.FetchTasks, payload: Tasks };
}
export function addTaskAction(Task: TaskModel): TasksAction {
    return { type: TasksActionType.AddTask, payload: Task };
}
export function updateTaskAction(Task: TaskModel): TasksAction {
    return { type: TasksActionType.UpdateTask, payload: Task };
}
export function deleteTaskAction(id: number): TasksAction {
    return { type: TasksActionType.DeleteTask, payload: id };
}

// Tasks Reducer - the main function performing any action on Tasks state:
// the new TasksState() is a default value for the first time only
export function tasksReducer(currentState = new TasksState(), action: TasksAction): TasksState {

    // Must duplicate the current state and not touch the given current state: 
    const newState = { ...currentState };

    switch (action.type) {

        case TasksActionType.FetchTasks:
            newState.Tasks = action.payload; // Here the payload is the Tasks list.
            break;

        case TasksActionType.AddTask:
            newState.Tasks.push(action.payload); // Here the payload is a single object to add.
            break;

        case TasksActionType.UpdateTask:
            const indexToUpdate = newState.Tasks.findIndex(p => p.id === action.payload.id); // Here the payload is a single object to update.
            if (indexToUpdate >= 0) {
                newState.Tasks[indexToUpdate] = action.payload;
            }
            break;

        case TasksActionType.DeleteTask:
            const indexToDelete = newState.Tasks.findIndex(p => p.id === action.payload); // Here the payload is the id to delete.
            if (indexToDelete >= 0) {
                newState.Tasks.splice(indexToDelete, 1);
            }
            break;
    }

    return newState;
}
