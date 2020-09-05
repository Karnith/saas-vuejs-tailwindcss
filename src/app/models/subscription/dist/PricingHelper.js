"use strict";
exports.__esModule = true;
var Price_1 = require("./Price");
var store_1 = require("@/store");
var vue_i18n_1 = require("@/plugins/vue-i18n");
var PricingHelper = /** @class */ (function () {
    function PricingHelper() {
    }
    PricingHelper.GetPriceDescription = function (product) {
        return ("$" +
            this.GetPrice(product, store_1["default"].state.pricing.billingPeriod).price +
            +this.GetSelectedBillingPeriodDescription(product));
    };
    PricingHelper.GetPrice = function (product, billingPeriod) {
        var _a;
        return ((_a = product.prices.find(function (e) { return e.billingPeriod === billingPeriod; })) !== null && _a !== void 0 ? _a : product.prices[0]);
    };
    PricingHelper.GetSelectedPrice = function (product) {
        return this.GetPrice(product, store_1["default"].state.pricing.billingPeriod);
    };
    PricingHelper.GetSelectedBillingPeriodDescription = function (product) {
        var _a;
        if (((_a = this.GetSelectedPrice(product)) === null || _a === void 0 ? void 0 : _a.type) === Price_1.PriceType.OneTime) {
            return vue_i18n_1.i18n.t("marketing.pricing.once").toString();
        }
        else {
            return (" / " +
                vue_i18n_1.i18n
                    .t("marketing.pricing." +
                    Price_1.BillingPeriod[store_1["default"].state.pricing.billingPeriod] +
                    "Short")
                    .toString());
        }
    };
    return PricingHelper;
}());
exports["default"] = PricingHelper;
