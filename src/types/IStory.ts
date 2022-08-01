import { ISubstoryBlock } from "./ISubstoryBlock";

export interface IStory {
    _id?: string;
    name: string;
    storyMap: ISubstoryBlock[];
}
