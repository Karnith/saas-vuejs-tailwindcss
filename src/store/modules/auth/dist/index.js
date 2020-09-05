"use strict";
exports.__esModule = true;
exports.auth = exports.state = void 0;
var store_1 = require("@/store");
var router_1 = require("@/router");
var SignalR_1 = require("@/plugins/SignalR");
var mixpanel_browser_1 = require("mixpanel-browser");
var logrocket_1 = require("logrocket");
var IUserDTO_1 = require("@/app/models/system/account/IUserDTO");
exports.state = {
    authenticated: false,
    token: ""
};
exports.auth = {
    namespaced: true,
    state: exports.state,
    actions: {
        logout: function (_a, payload) {
            var commit = _a.commit, rootState = _a.rootState;
            if (mixpanel_browser_1["default"]) {
                mixpanel_browser_1["default"].track("Logout");
            }
            SignalR_1.SignalService.closeConnection();
            commit("logout");
            store_1["default"].commit("locale/reset");
            store_1["default"].commit("account/reset");
            // store.commit("navigation/reset");
            store_1["default"].commit("pricing/reset");
            store_1["default"].commit("tenant/reset");
            store_1["default"].commit("theme/reset");
            router_1["default"].push("/account/login");
        }
    },
    mutations: {
        login: function (state, payload) {
            var _a, _b, _c, _d;
            SignalR_1.SignalService.startConnection();
            state.authenticated = true;
            state.token = payload.token;
            localStorage.setItem("id_token", state.token);
            store_1["default"].dispatch("account/logged", payload.user);
            store_1["default"].commit("tenant/myTenants", payload.myTenants);
            store_1["default"].commit("tenant/current", payload.currentTenant);
            // @ts-ignore
            if (window.analytics) {
                // @ts-ignore
                window.analytics.identify(payload.user.username, {
                    email: payload.user.email,
                    firstName: payload.user.firstName,
                    lastName: payload.user.lastName,
                    type: payload.user.type,
                    tenant: payload.currentTenant
                });
            }
            if (mixpanel_browser_1["default"]) {
                mixpanel_browser_1["default"].identify(payload.user.Id);
                if (mixpanel_browser_1["default"].people) {
                    mixpanel_browser_1["default"].people.set({
                        USER_ID: payload.user.Id,
                        $email: payload.user.email,
                        "First name": payload.user.firstName,
                        "Last name": payload.user.lastName
                    });
                }
                mixpanel_browser_1["default"].track("Login");
            }
            if (logrocket_1["default"]) {
                logrocket_1["default"].identify(payload.user.email, {
                    username: payload.user.username,
                    firstName: payload.user.firstName,
                    lastName: payload.user.lastName,
                    email: payload.user.email,
                    stripeCustomerId: (_b = (_a = payload.currentTenant) === null || _a === void 0 ? void 0 : _a.stripeCustomerId) !== null && _b !== void 0 ? _b : "",
                    stripeSubscriptionId: (_d = (_c = payload.currentTenant) === null || _c === void 0 ? void 0 : _c.stripeSubscriptionId) !== null && _d !== void 0 ? _d : ""
                });
            }
            if (payload.user.type === IUserDTO_1.UserType.Admin) {
                router_1["default"].push("/admin/dashboard");
            }
            else {
                router_1["default"].push("/app/dashboard");
            }
        },
        logout: function (state) {
            state.authenticated = false;
            state.token = "";
            localStorage.removeItem("id_token");
        }
    }
};
