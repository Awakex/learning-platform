import { Request } from "../request";
import { CreateSetDto } from "../../dtos/CreateSetDto";

export const SetsAPI = {
    getSets: () => {
        return Request.get(`/sets`);
    },
    createSet: (dto: CreateSetDto) => {
        return Request.post(`/sets/create`, dto);
    },
    getSet: (setId: string) => {
        return Request.get(`/sets/${setId}`);
    },
    updateSet: (setId: string, dto: CreateSetDto) => {
        return Request.put(`/sets/${setId}`, dto);
    },
};
