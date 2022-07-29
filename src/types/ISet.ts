import { IReward } from "./IReward";

export interface ISet {
    title?: string;
    tasks?: string[];
    _id?: string;
    rewards: IReward[];
}
