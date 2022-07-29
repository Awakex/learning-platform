import { IItemRarity } from "./IItemRarity";
import { IItemType } from "./IItemType";

export interface IItem {
    _id?: string;
    name: string;
    rarity: IItemRarity;
    type: IItemType;
}
