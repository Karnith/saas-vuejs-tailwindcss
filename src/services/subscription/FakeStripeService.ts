import { StripePrice } from "@/app/models/subscription/StripePrice";
import Stripe from "stripe";
import { defaultProductsDevelopment } from "@/store/modules/pricing/default-pricing.Development";

const myProducts = [defaultProductsDevelopment[0].prices[0]];
const customer: Stripe.Customer | null = null;
const invoices: Stripe.ApiList<Stripe.Invoice> | never[] = [];
const cards: Stripe.ApiList<Stripe.Card> | never[] = [];
const paymentMethods: Stripe.ApiList<Stripe.PaymentMethod> | never[] = [];

export const getCurrentCustomerFakeResponse = {
  data: {
    myProducts,
    customer,
    invoices,
    cards,
    paymentMethods,
  },
};
