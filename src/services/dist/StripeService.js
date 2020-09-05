"use strict";
exports.__esModule = true;
exports.stripeService = void 0;
var axios_helper_1 = require("../plugins/axios-helper");
var store_1 = require("@/store");
var default_pricing_Development_1 = require("@/store/modules/pricing/default-pricing.Development");
var default_pricing_1 = require("@/store/modules/pricing/default-pricing");
var StripePrice_1 = require("@/app/models/subscription/StripePrice");
var debug = process.env.NODE_ENV !== "production";
var StripeService = /** @class */ (function () {
    function StripeService() {
    }
    StripeService.prototype.getProducts = function (fromServer, onlyActive) {
        return new Promise(function (resolve, reject) {
            if (!fromServer) {
                var products = [];
                if (debug) {
                    products = default_pricing_Development_1.defaultProductsDevelopment;
                }
                else {
                    products = default_pricing_1.defaultProducts;
                }
                if (onlyActive) {
                    products = products.filter(function (f) { return f.active && f.prices.find(function (f) { return f.active; }); });
                }
                store_1["default"].commit("pricing/products", products);
                resolve(products);
            }
            else {
                axios_helper_1["default"]
                    .get("stripe/products", {
                    masterDatabase: true
                })
                    .then(function (response) {
                    store_1["default"].commit("pricing/products", response.data);
                    resolve(response.data);
                })["catch"](function (error) {
                    reject(error);
                });
            }
        });
    };
    StripeService.prototype.getProduct = function (uuid) {
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .get("stripe/product/" + uuid, {
                masterDatabase: true
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    StripeService.prototype.getPrice = function (uuid) {
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .get("stripe/price/" + uuid, {
                masterDatabase: true
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    StripeService.prototype.getCurrentCustomer = function () {
        return new Promise(function (resolve, reject) {
            var _a;
            axios_helper_1["default"]
                .get("stripe/getCurrent/" + ((_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey), {
                masterDatabase: true
            })
                .then(function (response) {
                store_1["default"].commit("tenant/stripe", response.data);
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    StripeService.prototype.cancel = function () {
        return new Promise(function (resolve, reject) {
            var _a;
            axios_helper_1["default"]
                .post("stripe/cancel/" + ((_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey), null, {
                masterDatabase: true
            })
                .then(function (response) {
                store_1["default"].commit("tenant/stripe", response.data);
                store_1["default"].commit("pricing/select", {
                    product: null,
                    billingPeriod: StripePrice_1.BillingPeriod.Monthly
                });
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    StripeService.prototype.updateSubscription = function (price) {
        return new Promise(function (resolve, reject) {
            var _a;
            axios_helper_1["default"]
                .post("stripe/updateSubscription/" + ((_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey), price, {
                masterDatabase: true
            })
                .then(function (response) {
                store_1["default"].commit("tenant/stripe", response.data);
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    StripeService.prototype.updateCard = function (stripeToken) {
        return new Promise(function (resolve, reject) {
            var _a;
            axios_helper_1["default"]
                .post("stripe/updateCard/" + ((_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey) +
                "?stripeToken=" +
                stripeToken, null, {
                masterDatabase: true
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    StripeService.prototype.getUpcomingInvoice = function () {
        return new Promise(function (resolve, reject) {
            var _a;
            return axios_helper_1["default"]
                .get("stripe/upcomingInvoice/" + ((_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey), {
                masterDatabase: true
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    StripeService.prototype.createCustomerPortalSession = function () {
        return new Promise(function (resolve, reject) {
            var _a;
            return axios_helper_1["default"]
                .post("stripe/createCustomerPortalSession/" + ((_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey), {
                masterDatabase: true
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    return StripeService;
}());
exports.stripeService = new StripeService();
