"use strict";
var _a, _b, _c, _d;
exports.__esModule = true;
exports.theme = exports.state = exports.defaultState = void 0;
exports.defaultState = {
    marketingTheme: (_a = process.env.VUE_APP_THEME_MARKETING_THEME) !== null && _a !== void 0 ? _a : "theme-bg-dark",
    marketingColor: (_b = process.env.VUE_APP_THEME_MARKETING_COLOR) !== null && _b !== void 0 ? _b : "theme-indigo",
    appTheme: (_c = process.env.VUE_APP_THEME) !== null && _c !== void 0 ? _c : "theme-bg-dark",
    appColor: (_d = process.env.VUE_APP_COLOR) !== null && _d !== void 0 ? _d : "theme-yellow"
};
exports.state = exports.defaultState;
exports.theme = {
    namespaced: true,
    state: exports.state,
    getters: {
        marketingTheme: function (state) {
            return state.marketingTheme;
        },
        marketingColor: function (state) {
            return state.marketingColor;
        },
        appTheme: function (state) {
            var _a;
            return (_a = state.appTheme) !== null && _a !== void 0 ? _a : exports.defaultState.appTheme;
        },
        appColor: function (state) {
            var _a;
            return (_a = state.appColor) !== null && _a !== void 0 ? _a : exports.defaultState.appColor;
        }
    },
    mutations: {
        reset: function (state) {
            state = exports.defaultState;
        },
        marketingTheme: function (state, payload) {
            state.marketingTheme = payload;
        },
        marketingColor: function (state, payload) {
            state.marketingColor = payload;
        },
        appTheme: function (state, payload) {
            state.appTheme = payload;
        },
        appColor: function (state, payload) {
            state.appColor = payload;
        }
    }
};
