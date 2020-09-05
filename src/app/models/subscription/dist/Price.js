"use strict";
exports.__esModule = true;
exports.BillingPeriod = exports.PriceType = void 0;
var Price = /** @class */ (function () {
    function Price() {
    }
    return Price;
}());
exports["default"] = Price;
var PriceType;
(function (PriceType) {
    PriceType[PriceType["OneTime"] = 0] = "OneTime";
    PriceType[PriceType["Recurring"] = 1] = "Recurring";
})(PriceType = exports.PriceType || (exports.PriceType = {}));
var BillingPeriod;
(function (BillingPeriod) {
    BillingPeriod[BillingPeriod["Once"] = 0] = "Once";
    BillingPeriod[BillingPeriod["Daily"] = 1] = "Daily";
    BillingPeriod[BillingPeriod["Weekly"] = 2] = "Weekly";
    BillingPeriod[BillingPeriod["Monthly"] = 3] = "Monthly";
    BillingPeriod[BillingPeriod["Every3Months"] = 4] = "Every3Months";
    BillingPeriod[BillingPeriod["Every6Months"] = 5] = "Every6Months";
    BillingPeriod[BillingPeriod["Yearly"] = 6] = "Yearly";
})(BillingPeriod = exports.BillingPeriod || (exports.BillingPeriod = {}));
