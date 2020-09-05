import Services from "@/services";
import { Module } from "vuex";
import { TenantState, RootState } from "@/types/stateTypes";
import { Stripe } from "stripe";
import store from "@/store";
import {
  ITenantDTO,
  TenantUserRole,
  ITenantUserDTO,
} from "@/app/models/system/account/ITenantDTO";
import { StripePrice } from "@/app/models/subscription/StripePrice";

export const state: TenantState = {
  tenants: [],
  current: null,
  myProducts: [],
  stripeCustomer: null,
  stripeMyProducts: null,
  stripeInvoices: null,
  stripeCards: null,
  stripePaymentMethods: null,
  members: [],
};
export const tenant: Module<TenantState, RootState> = {
  namespaced: true,
  state,
  getters: {
    defaultStripeCard: (state: TenantState) => {
      const cards = state.stripePaymentMethods as Stripe.ApiList<
        Stripe.PaymentMethod
      >;
      if (cards && cards.data && cards.data.length > 0) {
        return cards.data[0].card;
      }
      return null;
    },
    activeProduct: (state: TenantState) => {
      if (state.myProducts && state.myProducts.length > 0) {
        return state.myProducts[0].product;
      } else {
        return null;
      }
    },
    activePrice: (state: TenantState) => {
      if (state.myProducts && state.myProducts.length > 0) {
        return state.myProducts[0];
      } else {
        return null;
      }
    },
    subscription: (state: TenantState) => {
      const stripeMyProducts = store.state.tenant.stripeMyProducts;
      if (stripeMyProducts?.data) {
        return stripeMyProducts;
      }
    },
    roleName: (state: TenantState) => {
      if (state.current?.currentUser) {
        return TenantUserRole[state.current?.currentUser.role];
      }
      return "--";
    },
    role: (state: TenantState) => {
      if (state.current?.currentUser) {
        return state.current?.currentUser.role;
      }
      return "--";
    },
    isOwnerOrAdmin: (state: TenantState) => {
      return (
        state.current?.currentUser?.role === TenantUserRole.Owner ||
        state.current?.currentUser?.role === TenantUserRole.Admin
      );
    },
    memberCount: (state: TenantState) => {
      return state.members.length;
    },
  },
  mutations: {
    reset(state: TenantState) {
      state.tenants = [];
      state.current = null;
      state.myProducts = [];
      state.stripeCustomer = null;
      state.stripeMyProducts = null;
      state.stripeInvoices = null;
      state.stripeCards = null;
      state.stripePaymentMethods = null;
      state.members = [];
    },
    myTenants: (state: TenantState, payload: ITenantDTO[]) => {
      state.tenants = payload;
    },
    current: (state: TenantState, payload: ITenantDTO) => {
      state.current = payload;
      if (payload) {
        store.commit("theme/appTheme", payload.appTheme);
        store.commit("theme/appColor", payload.appColor);
      }
    },
    currentImage: (state: TenantState, payload: any) => {
      if (state.current) {
        if (payload.imageType === "icon") {
          state.current.icon = payload.image;
        } else if (payload.imageType === "logo") {
          state.current.logo = payload.image;
        } else if (payload.imageType === "logoDarkmode") {
          state.current.logoDarkmode = payload.image;
        }
      }
    },
    stripe: (state: TenantState, payload: any) => {
      const myProducts = payload.myProducts as StripePrice[];
      const customer = payload.customer as Stripe.Customer;
      const invoices = payload.invoices as Stripe.ApiList<Stripe.Invoice>;
      const cards = payload.cards as Stripe.ApiList<Stripe.Card>;
      const paymentMethods = payload.paymentMethods as Stripe.ApiList<
        Stripe.PaymentMethod
      >;
      if (state.tenants && customer) {
        state.tenants.forEach((tenant) => {
          if (tenant.stripeCustomerId === customer.id) {
            tenant.products = myProducts;
          }
        });
      }

      store.dispatch("pricing/myProducts", myProducts);
      state.myProducts = myProducts;
      state.stripeCustomer = customer;
      state.stripeInvoices = invoices;
      state.stripeCards = cards;
      state.stripePaymentMethods = paymentMethods;
    },
    appTheme(state: TenantState, payload: string) {
      if (state.current) {
        state.current.appTheme = payload;
      }
    },
    appColor(state: TenantState, payload: string) {
      if (state.current) {
        state.current.appColor = payload;
      }
    },
    members(state: TenantState, payload: ITenantUserDTO[]) {
      state.members = payload;
    },
    settings(state: TenantState, payload: ITenantDTO) {
      if (state.current) {
        state.current.name = payload.name;
        state.current.subdomain = payload.subdomain;
        state.current.appTheme = payload.appTheme;
        state.current.appColor = payload.appColor;
        state.current.icon = payload.icon;
        state.current.logo = payload.logo;
        state.current.logoDarkmode = payload.logoDarkmode;
      }
    },
  },
};
