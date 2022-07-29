import { IItem } from "./IItem";

export interface IReward {
    _id?: string;
    dropRate: number;
    item: IItem;
}
