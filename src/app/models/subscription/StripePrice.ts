import { StripeProduct } from "./StripeProduct";
import { Entity } from "../Entity";
import { ColumnType, ValueType } from "../ColumnType";

export interface StripePrice extends Entity {
  stripeId: string;
  type: PriceType;
  billingPeriod: BillingPeriod;
  price: number;
  currency: string;
  trialDays: number;
  active: boolean;
  priceBefore?: number;
  stripeProductId?: number;
  product?: StripeProduct;
}
export enum PriceType {
  OneTime,
  Recurring,
}
export enum BillingPeriod {
  Once,
  Daily,
  Weekly,
  Monthly,
  Yearly,
}

export const columns: ColumnType[] = [
  {
    name: "stripeId",
    cannotEdit: true,
    optional: true,
  },
  {
    name: "type",
    valueType: ValueType.PriceType,
    cannotEdit: true,
  },
  {
    name: "billingPeriod",
    valueType: ValueType.PriceBillingPeriod,
    cannotEdit: true,
  },
  { name: "price", valueType: ValueType.Money, cannotEdit: true },
  { name: "currency", cannotEdit: true, values: ["usd", "mxn", "eur"] },
  {
    name: "trialDays",
    cannotEdit: true,
    optional: true,
  },
  {
    name: "active",
    valueType: ValueType.Bool,
  },
  { name: "priceBefore", valueType: ValueType.Money, optional: true },
];
