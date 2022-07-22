import { CreateTaskDto } from "../../types/CreateTaskDto";
import { ITask } from "../../types/ITask";
import { Request } from "../request";

export const TasksAPI = {
    createTask: (dto: CreateTaskDto) => {
        return Request.post(`/tasks/create`, dto);
    },
    getTask: (taskId: string) => {
        return Request.get(`/tasks/${taskId}`);
    },
    updateTask: (taskId: string, dto: ITask) => {
        return Request.put(`/tasks/${taskId}`, dto);
    },
    attachImage: (taskId: string, file: File) => {
        let formData = new FormData();
        formData.append("file", file);
        return Request.put(`/tasks/${taskId}/attach-image`, formData);
    },
};
