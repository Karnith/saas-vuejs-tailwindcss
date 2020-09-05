import { OrderedEntity } from "../Entity";
import { StripePrice } from "./StripePrice";
import { ColumnType, ValueType } from "../ColumnType";

export interface StripeFeature extends OrderedEntity {
  key: string;
  value: string;
  included: boolean;
  stripePriceId?: number;
  price?: StripePrice;
}

export const columns: ColumnType[] = [
         {
           name: "order",
           valueType: ValueType.Number,
         },
         {
           name: "key",
           valueType: ValueType.String,
         },
         {
           name: "value",
           valueType: ValueType.String,
           optional: true,
         },
         {
           name: "included",
           valueType: ValueType.Bool,
         },
       ];
