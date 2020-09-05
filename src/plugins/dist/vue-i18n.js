"use strict";
/* ============
 * Vue i18n
 * ============
 */
var _a, _b;
exports.__esModule = true;
exports.i18n = void 0;
var vue_1 = require("vue");
var vue_i18n_1 = require("vue-i18n");
var index_js_1 = require("@/locale/index.js");
var store_1 = require("@/store");
vue_1["default"].use(vue_i18n_1["default"]);
var dateTimeFormats = {
    en: {
        mini: {
            month: "short",
            day: "numeric"
        },
        short: {
            year: "numeric",
            month: "short",
            day: "numeric"
        },
        long: {
            year: "numeric",
            month: "short",
            day: "numeric",
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
            hour12: true
        }
    },
    es: {
        mini: {
            month: "short",
            day: "numeric"
        },
        short: {
            year: "numeric",
            month: "short",
            day: "numeric"
        },
        long: {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short",
            hour: "numeric",
            minute: "numeric"
        }
    }
};
exports.i18n = new vue_i18n_1["default"]({
    locale: store_1["default"].state.locale
        ? store_1["default"].state.locale.locale
        : (_a = process.env.VUE_APP_LANGUAGE) === null || _a === void 0 ? void 0 : _a.toString(),
    fallbackLocale: store_1["default"].state.locale
        ? store_1["default"].state.locale.locale
        : (_b = process.env.VUE_APP_LANGUAGE) === null || _b === void 0 ? void 0 : _b.toString(),
    messages: index_js_1["default"],
    dateTimeFormats: dateTimeFormats,
    silentFallbackWarn: true
});
exports["default"] = {
    i18n: exports.i18n
};
