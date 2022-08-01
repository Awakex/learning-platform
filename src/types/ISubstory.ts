import { ISubstoryType } from "./ISubstoryType";

export interface ISubstory {
    _id?: string;
    content: string;
    type: ISubstoryType;
    icon: string;
    set?: string;
}
