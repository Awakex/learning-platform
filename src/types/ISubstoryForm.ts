import { ISubstoryType } from "./ISubstoryType";

export interface ISubstoryForm {
    substoryId: string;
    type: ISubstoryType;
    icon: string;
    content: string;
    setId: string;
}
