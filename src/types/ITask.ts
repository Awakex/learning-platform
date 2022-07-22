import { TASK_TYPES } from "./TaskTypes";

export interface ITask {
    _id: string;
    type: TASK_TYPES;
    question: string;
    image: string;
}
