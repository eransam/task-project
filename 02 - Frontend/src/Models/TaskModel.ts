class TaskModel {
    [x: string]: any;
    public id: number = 0;
    public Title: string = "";
    public AssigneeName: string = "";
    public CreationDate: string = "";
    public Status: string = "";
    public imageName: string = ""; // The image name on the backend ("1.jpg")
    public image: FileList = null; // The image file to send to backend
    public Description: string = "";
    public RelatedTickets: string = "";
}

export default TaskModel;
