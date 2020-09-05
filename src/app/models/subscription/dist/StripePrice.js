"use strict";
exports.__esModule = true;
exports.stripePriceColumns = exports.BillingPeriod = exports.PriceType = void 0;
var ColumnType_1 = require("../ColumnType");
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
exports.stripePriceColumns = [
    {
        name: "stripeId"
    },
    {
        name: "type",
        valueType: ColumnType_1.ValueType.PriceType
    },
    {
        name: "billingPeriod",
        valueType: ColumnType_1.ValueType.PriceBillingPeriod
    },
    { name: "price", valueType: ColumnType_1.ValueType.Money },
    { name: "currency" },
    { name: "trialDays" },
    {
        name: "active",
        valueType: ColumnType_1.ValueType.Bool
    },
    { name: "priceBefore", valueType: ColumnType_1.ValueType.Money },
];
