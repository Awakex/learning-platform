import { TASK_TYPES } from "./TaskTypes";
import { AnswersTypeEnum } from "./AnswersTypeEnum";
import { ITaskSettings } from "./ITaskSettings";

export interface ITask {
    _id: string;
    type: TASK_TYPES;
    question: string;
    image: string;
    answersType: AnswersTypeEnum;
    settings: undefined | ITaskSettings;
}
