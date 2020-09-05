import { Module } from "vuex";
import { PricingState, RootState } from "@/types/stateTypes";
import { StripeProduct } from "@/app/models/subscription/StripeProduct";
import {
  StripePrice,
  BillingPeriod,
} from "@/app/models/subscription/StripePrice";

export const state: PricingState = {
  products: [],
  selectedProduct: null,
  billingPeriod: BillingPeriod.Monthly,
  currency: "usd",
};
export const pricing: Module<PricingState, RootState> = {
  namespaced: true,
  state,
  actions: {
    myProducts({ commit }, prices: StripePrice[]) {
      if (prices && prices.length > 0) {
        const productPrice = prices[0];
        if (productPrice.billingPeriod === BillingPeriod.Once) {
          commit("billingPeriod", productPrice.billingPeriod);
        } else {
          commit("billingPeriod", BillingPeriod.Monthly);
        }
        const selected = this.state.pricing.products.find((f: StripeProduct) =>
          f.prices.find((x) => x.stripeId === productPrice.stripeId)
        ) as StripeProduct;
        // console.log("selected: " + JSON.stringify(selected));
        commit("select", {
          product: selected,
          billingPeriod: state.billingPeriod,
        });
      }
    },
  },
  getters: {
    selectedProductName: (state: PricingState) => {
      return state.selectedProduct?.title;
    },
    selectedProduct: (state: PricingState) => {
      return state.selectedProduct;
    },
    selectedPrice: (state: PricingState) => {
      return (
        state.selectedProduct?.prices.find(
          (e) =>
            e.billingPeriod === state.billingPeriod &&
            e.currency === state.currency
        ) ??
        state.selectedProduct?.prices.filter(
          (f) => f.currency === state.currency
        )[0]
      );
    },
    selectedBillingPeriod: (state: PricingState, getters) => {
      if (
        getters.selectedPrice &&
        getters.selectedPrice.billingPeriod === BillingPeriod.Once
      ) {
        return "once";
      } else {
        return BillingPeriod[state.billingPeriod] + "Short";
      }
    },
    productCount: (state: PricingState) => {
      return state.products.length;
    },
  },
  mutations: {
    reset: (state) => {
      state.products = [];
      state.selectedProduct = null;
      state.billingPeriod = BillingPeriod.Monthly;
    },
    products: (state: PricingState, payload: StripeProduct[]) => {
      if (payload) {
        payload = payload.sort((x, y) => {
          return x.tier > y.tier ? 1 : -1;
        });
      }
      state.products = payload;
      if (payload.length > 0) {
        if (payload[0].prices.length > 0) {
          state.billingPeriod = payload[0].prices[0].billingPeriod;
          state.currency = payload[0].prices[0].currency;
        }
      }
    },
    select: (state: PricingState, payload) => {
      state.billingPeriod = payload.billingPeriod;
      state.selectedProduct = payload.product;
    },
    billingPeriod: (state: PricingState, payload: BillingPeriod) => {
      state.billingPeriod = payload;
    },
    currency: (state: PricingState, payload: string) => {
      state.currency = payload;
    },
  },
};
