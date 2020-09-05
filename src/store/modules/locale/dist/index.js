"use strict";
var _a, _b;
exports.__esModule = true;
exports.locale = exports.state = void 0;
exports.state = {
    locale: (_b = (_a = process.env.VUE_APP_LANGUAGE) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "en-US"
};
exports.locale = {
    namespaced: true,
    state: exports.state,
    mutations: {
        reset: function (state, payload) {
            var _a, _b;
            state.locale = (_b = (_a = process.env.VUE_APP_LANGUAGE) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "en-US";
        },
        updateLocale: function (state, locale) {
            state.locale = locale;
        }
    }
};
