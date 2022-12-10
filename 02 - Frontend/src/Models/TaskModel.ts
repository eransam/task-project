class TaskModel {
    public id: number = 0;
    public title: string = "";
    public assigneeName: string = "";
    public creationDate: string = "";
    public status: string = "";
    public imageName: string = ""; // The image name on the backend ("1.jpg")
    public image: FileList = null; // The image file to send to backend
    public Description: string = "";
    public RelatedTickets: string = "";
}

export default TaskModel;
