"use strict";
exports.__esModule = true;
exports.ValueType = exports.ColumnType = void 0;
var StripePrice_1 = require("../../app/models/subscription/StripePrice");
var ColumnType = /** @class */ (function () {
    function ColumnType() {
        this.valueType = ValueType.String;
    }
    ColumnType.convertValue = function (item, column) {
        var value = item[column.name];
        console.log(column.name + ": " + value + " " + column.valueType);
        if (column.valueType && value !== null) {
            switch (column.valueType) {
                case ValueType.String:
                    return value;
                case ValueType.Money:
                    return ("$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") || "");
                case ValueType.PriceBillingPeriod:
                    return StripePrice_1.BillingPeriod[value].toString();
                case ValueType.PriceType:
                    return StripePrice_1.PriceType[value];
                case ValueType.Bool:
                    if (value) {
                        return "yes";
                    }
                    else {
                        return "no";
                    }
                //     ? i18n.t("shared.active").toString()
                //     : i18n.t("shared.inactive").toString();
            }
        }
        return value;
    };
    ColumnType.getFormType = function (column) {
        if (!column.valueType) {
            return "input";
        }
        else {
            switch (column.valueType) {
                case ValueType.String:
                case ValueType.Money:
                case ValueType.Number:
                    return "input";
                case ValueType.Bool:
                    return "checkbox";
                case ValueType.PriceType:
                case ValueType.PriceBillingPeriod:
                    return "select";
                case ValueType.Image:
                    return "image";
                default:
                    break;
            }
        }
    };
    ColumnType.getFormInputType = function (column) {
        if (this.getFormType(column) === "input") {
            switch (column.valueType) {
                case ValueType.Money:
                case ValueType.Number:
                    return "number";
            }
        }
    };
    return ColumnType;
}());
exports.ColumnType = ColumnType;
var ValueType;
(function (ValueType) {
    ValueType[ValueType["String"] = 0] = "String";
    ValueType[ValueType["Bool"] = 1] = "Bool";
    ValueType[ValueType["Money"] = 2] = "Money";
    ValueType[ValueType["PriceType"] = 3] = "PriceType";
    ValueType[ValueType["PriceBillingPeriod"] = 4] = "PriceBillingPeriod";
    ValueType[ValueType["Number"] = 5] = "Number";
    ValueType[ValueType["Image"] = 6] = "Image";
})(ValueType = exports.ValueType || (exports.ValueType = {}));
