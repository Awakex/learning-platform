import { TASK_TYPES } from "./TaskTypes";
import { AnswersTypeEnum } from "./AnswersTypeEnum";

export interface ITask {
    _id: string;
    type: TASK_TYPES;
    question: string;
    image: string;
    answersType: AnswersTypeEnum;
}
