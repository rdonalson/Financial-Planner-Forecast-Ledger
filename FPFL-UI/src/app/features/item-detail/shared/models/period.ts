import { IItem } from "./item";

export interface IPeriod {
  id: number;
  name: string;
  items: IItem[];
}
