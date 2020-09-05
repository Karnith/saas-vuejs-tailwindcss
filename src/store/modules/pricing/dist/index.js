"use strict";
exports.__esModule = true;
exports.pricing = exports.state = void 0;
var StripePrice_1 = require("@/app/models/subscription/StripePrice");
exports.state = {
    products: [],
    selectedProduct: null,
    billingPeriod: StripePrice_1.BillingPeriod.Monthly,
    currency: "usd"
};
exports.pricing = {
    namespaced: true,
    state: exports.state,
    actions: {
        myProducts: function (_a, prices) {
            var commit = _a.commit;
            if (prices && prices.length > 0) {
                var productPrice_1 = prices[0];
                if (productPrice_1.billingPeriod === StripePrice_1.BillingPeriod.Once) {
                    commit("billingPeriod", productPrice_1.billingPeriod);
                }
                else {
                    commit("billingPeriod", StripePrice_1.BillingPeriod.Monthly);
                }
                var selected = this.state.pricing.products.find(function (f) {
                    return f.prices.find(function (x) { return x.stripeId === productPrice_1.stripeId; });
                });
                // console.log("selected: " + JSON.stringify(selected));
                commit("select", {
                    product: selected,
                    billingPeriod: exports.state.billingPeriod
                });
            }
        }
    },
    getters: {
        selectedProductName: function (state) {
            var _a;
            return (_a = state.selectedProduct) === null || _a === void 0 ? void 0 : _a.title;
        },
        selectedPrice: function (state) {
            var _a, _b, _c;
            return ((_b = (_a = state.selectedProduct) === null || _a === void 0 ? void 0 : _a.prices.find(function (e) {
                return e.billingPeriod === state.billingPeriod &&
                    e.currency === state.currency;
            })) !== null && _b !== void 0 ? _b : (_c = state.selectedProduct) === null || _c === void 0 ? void 0 : _c.prices.filter(function (f) { return f.currency === state.currency; })[0]);
        },
        selectedBillingPeriod: function (state, getters) {
            if (getters.selectedPrice &&
                getters.selectedPrice.billingPeriod === StripePrice_1.BillingPeriod.Once) {
                return "once";
            }
            else {
                return StripePrice_1.BillingPeriod[state.billingPeriod] + "Short";
            }
        },
        productCount: function (state) {
            return state.products.length;
        }
    },
    mutations: {
        reset: function (state) {
            state.products = [];
            state.selectedProduct = null;
            state.billingPeriod = StripePrice_1.BillingPeriod.Monthly;
        },
        products: function (state, payload) {
            if (payload) {
                payload = payload.sort(function (x, y) {
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
        select: function (state, payload) {
            state.billingPeriod = payload.billingPeriod;
            state.selectedProduct = payload.product;
        },
        billingPeriod: function (state, payload) {
            state.billingPeriod = payload;
        },
        currency: function (state, payload) {
            state.currency = payload;
        }
    }
};
