import { CreateTaskDto } from "../../dtos/CreateTaskDto";
import { ITask } from "../../types/ITask";
import { Request } from "../request";

export const TasksAPI = {
    createTask: (dto: CreateTaskDto) => {
        return Request.post(`/tasks/create`, dto);
    },
    getTask: (taskId: string) => {
        return Request.get(`/tasks/${taskId}`);
    },
    getTasks: (withSettings: boolean = false) => {
        return Request.get(`/tasks?withSettings=${withSettings}`);
    },
    updateTask: (taskId: string, dto: ITask) => {
        return Request.put(`/tasks/${taskId}`, dto);
    },
    attachImage: (taskId: string, file: File) => {
        let formData = new FormData();
        formData.append("file", file);
        return Request.put(`/tasks/${taskId}/attach-image`, formData);
    },
    deleteImage: (taskId: string) => {
        return Request.delete(`/tasks/${taskId}/image`);
    },
    saveSettings: (taskId: string, dto: TaskSettingsDto) => {
        return Request.post(`/tasks/${taskId}/settings`, dto);
    },
};
