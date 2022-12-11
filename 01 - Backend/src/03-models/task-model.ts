import Joi from "joi";
import { UploadedFile } from "express-fileupload";


class TaskModel {
    public id: number = 0;
    public Title: string;
    public AssigneeName: string;
    public CreationDate: string;
    public Status: string;
    public image: UploadedFile;
    public imageName: string;
    public Description: string;
    public RelatedTickets: string;

    public constructor(task: TaskModel) {
        this.id = task.id;
        this.Title = task.Title;
        this.AssigneeName = task.AssigneeName;
        this.CreationDate = task.CreationDate;
        this.Status = task.Status;
        this.imageName = task.imageName;
        this.image = task.image;
        this.Description = task.Description;
        this.RelatedTickets = task.RelatedTickets;

    }

    private static postSchema = Joi.object({
        id: Joi.forbidden(),
        Title: Joi.string().optional(),
        Description: Joi.string().optional(),
        RelatedTickets: Joi.string().optional(),
        AssigneeName: Joi.string().optional(),
        CreationDate: Joi.string().optional(),
        Status: Joi.string().optional(),
        imageName: Joi.string().optional(),
        image: Joi.object().optional()

    });

    private static putSchema = Joi.object({
        id: Joi.number().required().integer().min(1),
        Title: Joi.string().optional().min(2).max(100),
        Description: Joi.string().optional().min(2).max(100),
        RelatedTickets: Joi.string().optional().min(2).max(100),
        AssigneeName: Joi.string().optional().min(2).max(100),
        CreationDate: Joi.string().optional().min(2).max(100),
        Status: Joi.string().optional().min(2).max(100),
        image: Joi.object().optional(),
        imageName: Joi.string().optional()
        
    });

    private static patchSchema = Joi.object({
        id: Joi.number().required().integer().min(1),
        Description: Joi.string().optional().min(2).max(100),
        RelatedTickets: Joi.string().optional().min(2).max(100),
        Title: Joi.string().optional().min(2).max(100),
        AssigneeName: Joi.string().optional().min(2).max(100),
        CreationDate: Joi.string().optional().min(2).max(100),
        Status: Joi.string().optional().min(2).max(100),
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