import { IItem } from "../../types/IItem";
import { Request } from "../request";

export const ItemsAPI = {
    createItem: (dto: IItem) => {
        return Request.post(`/items`, dto);
    },
    getItems: () => {
        return Request.get(`/items`);
    },
    getItem: (id: string) => {
        return Request.get(`/items/${id}`);
    },
    editItem: (id: string, dto: IItem) => {
        return Request.put(`/items/${id}`, dto);
    },
};
