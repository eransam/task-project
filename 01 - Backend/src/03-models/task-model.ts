import Joi from "joi";
import { UploadedFile } from "express-fileupload";


class TaskModel {
    public id: number = 0;
    public title: string;
    public assigneeName: string;
    public creationDate: string;
    public status: string;
    public image: UploadedFile;
    public imageName: string;
    public Description: string;
    public RelatedTickets: string;

    public constructor(task: TaskModel) {
        this.id = task.id;
        this.title = task.title;
        this.assigneeName = task.assigneeName;
        this.creationDate = task.creationDate;
        this.status = task.status;
        this.imageName = task.imageName;
        this.image = task.image;
        this.Description = task.Description;
        this.RelatedTickets = task.RelatedTickets;

    }

    private static postSchema = Joi.object({
        id: Joi.forbidden(),
        title: Joi.string().optional(),
        Description: Joi.string().optional(),
        RelatedTickets: Joi.string().optional(),
        assigneeName: Joi.string().optional(),
        creationDate: Joi.string().optional(),
        status: Joi.string().optional(),
        imageName: Joi.string().optional(),
        image: Joi.object().optional()

    });

    private static putSchema = Joi.object({
        id: Joi.number().required().integer().min(1),
        title: Joi.string().optional().min(2).max(100),
        Description: Joi.string().optional().min(2).max(100),
        RelatedTickets: Joi.string().optional().min(2).max(100),
        assigneeName: Joi.string().optional().min(2).max(100),
        creationDate: Joi.string().optional().min(2).max(100),
        status: Joi.string().optional().min(2).max(100),
        image: Joi.object().optional(),
        imageName: Joi.string().optional()
        
    });

    private static patchSchema = Joi.object({
        id: Joi.number().required().integer().min(1),
        Description: Joi.string().optional().min(2).max(100),
        RelatedTickets: Joi.string().optional().min(2).max(100),
        title: Joi.string().optional().min(2).max(100),
        assigneeName: Joi.string().optional().min(2).max(100),
        creationDate: Joi.string().optional().min(2).max(100),
        status: Joi.string().optional().min(2).max(100),
        image: Joi.object().optional(),
        imageName: Joi.string().optional()
    });

    public validatePost(): string {
        const result = TaskModel.postSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(): string {
        const result = TaskModel.putSchema.validate(this);
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = TaskModel.patchSchema.validate(this);
        return result.error?.message;
    }

}

export default TaskModel;