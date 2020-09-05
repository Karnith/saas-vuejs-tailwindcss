import { Entity } from "../Entity";

export interface Expense extends Entity {
  description: string;
  quantity: number;
  price: number;
  amount: number;
  date: string;
  category: number;
  image: string;
}
