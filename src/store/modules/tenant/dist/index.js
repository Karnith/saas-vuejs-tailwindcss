"use strict";
exports.__esModule = true;
exports.tenant = exports.state = void 0;
var store_1 = require("@/store");
var ITenantDTO_1 = require("@/app/models/system/account/ITenantDTO");
exports.state = {
    tenants: [],
    current: null,
    myProducts: [],
    stripeCustomer: null,
    stripeMyProducts: null,
    stripeInvoices: null,
    stripeCards: null,
    stripePaymentMethods: null,
    members: []
};
exports.tenant = {
    namespaced: true,
    state: exports.state,
    getters: {
        defaultStripeCard: function (state) {
            var cards = state.stripePaymentMethods;
            if (cards && cards.data && cards.data.length > 0) {
                return cards.data[0].card;
            }
            return null;
        },
        activeProduct: function (state) {
            if (state.myProducts && state.myProducts.length > 0) {
                return state.myProducts[0].product;
            }
            else {
                return null;
            }
        },
        subscription: function (state) {
            var stripeMyProducts = store_1["default"].state.tenant.stripeMyProducts;
            if (stripeMyProducts === null || stripeMyProducts === void 0 ? void 0 : stripeMyProducts.data) {
                return stripeMyProducts;
            }
        },
        roleName: function (state) {
            var _a, _b;
            if ((_a = state.current) === null || _a === void 0 ? void 0 : _a.currentUser) {
                return ITenantDTO_1.TenantUserRole[(_b = state.current) === null || _b === void 0 ? void 0 : _b.currentUser.role];
            }
            return "--";
        },
        role: function (state) {
            var _a, _b;
            if ((_a = state.current) === null || _a === void 0 ? void 0 : _a.currentUser) {
                return (_b = state.current) === null || _b === void 0 ? void 0 : _b.currentUser.role;
            }
            return "--";
        },
        memberCount: function (state) {
            return state.members.length;
        }
    },
    mutations: {
        reset: function (state) {
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
        myTenants: function (state, payload) {
            state.tenants = payload;
        },
        current: function (state, payload) {
            state.current = payload;
            if (payload) {
                store_1["default"].commit("theme/appTheme", payload.appTheme);
                store_1["default"].commit("theme/appColor", payload.appColor);
            }
        },
        currentImage: function (state, payload) {
            if (state.current) {
                if (payload.imageType === "icon") {
                    state.current.icon = payload.image;
                }
                else if (payload.imageType === "logo") {
                    state.current.logo = payload.image;
                }
                else if (payload.imageType === "logoDarkmode") {
                    state.current.logoDarkmode = payload.image;
                }
            }
        },
        stripe: function (state, payload) {
            var myProducts = payload.myProducts;
            var customer = payload.customer;
            var invoices = payload.invoices;
            var cards = payload.cards;
            var paymentMethods = payload.paymentMethods;
            store_1["default"].dispatch("pricing/myProducts", myProducts);
            state.myProducts = myProducts;
            state.stripeCustomer = customer;
            state.stripeInvoices = invoices;
            state.stripeCards = cards;
            state.stripePaymentMethods = paymentMethods;
        },
        appTheme: function (state, payload) {
            if (state.current) {
                state.current.appTheme = payload;
            }
        },
        appColor: function (state, payload) {
            if (state.current) {
                state.current.appColor = payload;
            }
        },
        members: function (state, payload) {
            state.members = payload;
        }
    }
};
