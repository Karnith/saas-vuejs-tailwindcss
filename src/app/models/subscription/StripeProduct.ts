import { StripeFeature } from "./StripeFeature";
import { StripePrice } from "./StripePrice";
import { Entity } from "../Entity";

export interface StripeProduct extends Entity {
  stripeId: string;
  tier: number;
  title: string;
  description: string;
  badge: string;
  active: boolean;
  image?: string;
  maxUsers?: number;
  prices: StripePrice[];
  features: StripeFeature[];
}
