import { IItemRarity } from "./IItemRarity";
import { IItemType } from "./IItemType";

export interface IItem {
    name: string;
    rarity: IItemRarity;
    type: IItemType;
}
