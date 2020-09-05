import Stripe from "stripe";
import { IUserDTO } from "@/app/models/system/account/IUserDTO";
import {
  ITenantDTO,
  ITenantUserDTO,
} from "@/app/models/system/account/ITenantDTO";
import { StripeProduct } from "@/app/models/subscription/StripeProduct";
import {
  StripePrice,
  BillingPeriod,
} from "@/app/models/subscription/StripePrice";

export interface RootState {
  appName: string;
  version: string;
  locale: LocaleState;
  auth: AuthState;
  tenant: TenantState;
  account: AccountState;
  // navigation: NavigationState;
  pricing: PricingState;
}

export interface LocaleState {
  locale: string;
}

export interface AuthState {
  authenticated: boolean;
  token: string;
}
export interface TenantState {
  tenants: ITenantDTO[];
  current: ITenantDTO | null;
  myProducts: StripePrice[];
  stripeCustomer: Stripe.Customer | null;
  stripeMyProducts: Stripe.ApiList<Stripe.Product> | null;
  stripeInvoices: Stripe.ApiList<Stripe.Invoice> | null;
  stripeCards: Stripe.ApiList<Stripe.Card> | null;
  stripePaymentMethods: Stripe.ApiList<Stripe.PaymentMethod> | null;
  members: ITenantUserDTO[];
}
export interface AccountState {
  user: IUserDTO | null;
}
export interface PricingState {
  products: StripeProduct[];
  selectedProduct: StripeProduct | null;
  billingPeriod: BillingPeriod;
  currency: string;
}
export interface ThemeState {
  marketingTheme: string;
  marketingColor: string;
  appTheme: string;
  appColor: string;
}
