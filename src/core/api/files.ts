import { Request } from "../request";

export const FilesAPI = {
    createFile: (file: File) => {
        let formData = new FormData();
        formData.append("file", file);
        return Request.post(`/files`, formData);
    },
};
