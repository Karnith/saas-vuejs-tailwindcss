"use strict";
exports.__esModule = true;
exports.pricing = exports.state = void 0;

var Price_1 = require("@/app/models/subscription/StripePrice");

exports.state = {
  products: [],
  selectedProduct: null,
  billingPeriod: Price_1.BillingPeriod.Monthly
};
exports.pricing = {
  namespaced: true,
  state: exports.state,
  actions: {
    subscriptionLoaded: function subscriptionLoaded(_a, subscription) {
      var _b;

      var commit = _a.commit;

      if (subscription) {
        var billingPeriod = Price_1.BillingPeriod.Once;

        switch ((_b = subscription.plan) === null || _b === void 0 ? void 0 : _b.interval) {
          case "day":
            billingPeriod = Price_1.BillingPeriod.Daily;
            break;

          case "week":
            billingPeriod = Price_1.BillingPeriod.Weekly;
            break;

          case "month":
            billingPeriod = Price_1.BillingPeriod.Monthly;
            break;

          case "year":
            billingPeriod = Price_1.BillingPeriod.Yearly;
            break;

          default:
            billingPeriod = Price_1.BillingPeriod.Once;
        }

        commit("billingPeriod", billingPeriod);
        var selected = this.state.pricing.products.find(function (f) {
          return f.prices.find(function (x) {
            var _a;

            return x.id === ((_a = subscription.plan) === null || _a === void 0 ? void 0 : _a.id);
          });
        });
        commit("select", selected);
      }
    }
  },
  getters: {
    selectedProductName: function selectedProductName(state) {
      var _a;

      return (_a = state.selectedProduct) === null || _a === void 0 ? void 0 : _a.title;
    },
    selectedPrice: function selectedPrice(state) {
      var _a, _b, _c;

      return (_b = (_a = state.selectedProduct) === null || _a === void 0 ? void 0 : _a.prices.find(function (e) {
        return e.billingPeriod === state.billingPeriod;
      })) !== null && _b !== void 0 ? _b : (_c = state.selectedProduct) === null || _c === void 0 ? void 0 : _c.prices[0];
    },
    selectedBillingPeriod: function selectedBillingPeriod(state, getters) {
      if (getters.selectedPrice.billingPeriod === Price_1.BillingPeriod.Once) {
        return "once";
      } else {
        return Price_1.BillingPeriod[state.billingPeriod] + "Short";
      }
    },
    productCount: function productCount(state) {
      return state.products.length;
    }
  },
  mutations: {
    reset: function reset(state) {
      state.selectedProduct = null;
    },
    products: function products(state, payload) {
      state.products = payload;
    },
    select: function select(state, payload) {
      state.selectedProduct = payload;
    },
    billingPeriod: function billingPeriod(state, payload) {
      state.billingPeriod = payload;
    }
  }
};