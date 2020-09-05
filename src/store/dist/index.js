"use strict";
/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */
exports.__esModule = true;
var vue_1 = require("vue");
var vuex_1 = require("vuex");
var logger_1 = require("vuex/dist/logger");
var vuex_persistedstate_1 = require("vuex-persistedstate");
vue_1["default"].use(vuex_1["default"]);
// Modules
var locale_1 = require("./modules/locale");
var account_1 = require("./modules/account");
var auth_1 = require("./modules/auth");
var tenant_1 = require("./modules/tenant");
var pricing_1 = require("./modules/pricing");
var theme_1 = require("./modules/theme");
var debug = process.env.NODE_ENV !== "production";
var store = {
    modules: {
        locale: locale_1.locale,
        account: account_1.account,
        auth: auth_1.auth,
        // navigation,
        tenant: tenant_1.tenant,
        pricing: pricing_1.pricing,
        theme: theme_1.theme
    },
    strict: debug,
    plugins: debug
        ? [logger_1["default"](), vuex_persistedstate_1["default"]()]
        : [vuex_persistedstate_1["default"]()]
};
exports["default"] = new vuex_1["default"].Store(store);
