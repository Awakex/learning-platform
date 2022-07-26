import { Request } from "../request";

export const SetsAPI = {
    getSets: () => {
        return Request.get(`/sets`);
    },
};
