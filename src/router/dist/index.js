"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var store_1 = require("@/store");
var routes_1 = require("./routes");
var vue_meta_1 = require("vue-meta");
vue_1["default"].use(vue_router_1["default"]);
vue_1["default"].use(vue_meta_1["default"]);
var router = new vue_router_1["default"]({
    mode: "history",
    routes: routes_1["default"]
});
function hasQueryParams(route) {
    return !!Object.keys(route.query).length;
}
router.beforeEach(function (to, from, next) {
    var _a, _b;
    if (to.matched.some(function (record) { return record.meta.requiresAuth; })) {
        if (!store_1["default"].state.auth.authenticated) {
            next({
                path: "/account/login",
                query: {
                    redirect: to.fullPath
                }
            });
            return;
        }
        // else if (!store.state.tenant.current) {
        //   next({
        //     path: "/organizations",
        //   });
        //   return;
        // }
    }
    else if (to.matched.some(function (record) { return record.meta.requiresLoggedOut; })) {
        if (store_1["default"].state.auth.authenticated) {
            next({
                path: "/app/dashboard",
                query: {
                    redirect: to.fullPath
                }
            });
            return;
        }
    }
    // Subscription-based permissions
    if (to.matched.some(function (record) { return record.meta && record.meta.subscriptions; })) {
        // console.log("WILL CHECK SUBSCRIPTION PERMISSIONS");
        if (store_1["default"].state.tenant.myProducts.length === 0) {
            next({
                path: "/app/settings/organization/subscription"
            });
            return;
        }
        var subscriptionsAllowed = to.meta.subscriptions;
        var currentSubscription_1 = store_1["default"].state.tenant.myProducts[0].product;
        // console.log(
        //   "SUBSCRIPTIONS ALLOWED:" + JSON.stringify(subscriptionsAllowed)
        // );
        // console.log("CURRENT SUBSCRIPTION:" + JSON.stringify(currentSubscription));
        if (subscriptionsAllowed.some(function (f) { return f.tier === (currentSubscription_1 === null || currentSubscription_1 === void 0 ? void 0 : currentSubscription_1.tier); }) ===
            false) {
            // console.log("unauthorized");
            next({
                path: "/app/unauthorized"
            });
            return;
        }
    }
    var userTypesAllowed = to.meta.userTypes;
    if (to.matched.some(function (record) { return record.meta && record.meta.userTypes; }) &&
        userTypesAllowed) {
        // console.log("WILL CHECK USER TYPES");
        var currentType_1 = (_a = store_1["default"].state.account.user) === null || _a === void 0 ? void 0 : _a.type;
        // console.log("USER TYPES ALLOWED:" + JSON.stringify(userTypesAllowed));
        // console.log("CURRENT USER TYPE:" + JSON.stringify(currentType));
        if (userTypesAllowed.some(function (f) { return f === currentType_1; }) === false) {
            console.log("unauthorized");
            next({
                path: "/app/unauthorized"
            });
            return;
        }
    }
    var rolesAllowed = to.meta.roles;
    if (to.matched.some(function (record) { return record.meta && record.meta.roles; }) &&
        rolesAllowed) {
        // console.log("WILL CHECK ROLE PERMISSIONS");
        var currentRole_1 = (_b = store_1["default"].state.tenant.current) === null || _b === void 0 ? void 0 : _b.currentUser.role;
        // console.log("ROLES ALLOWED:" + JSON.stringify(rolesAllowed));
        // console.log("CURRENT ROLE:" + JSON.stringify(currentRole));
        if (rolesAllowed.some(function (f) { return f === currentRole_1; }) === false) {
            // console.log("unauthorized");
            next({
                path: "/app/unauthorized"
            });
            return;
        }
    }
    if (to.path.includes("pricing") || to.path.includes("register")) {
        // @ts-ignore
        window.analytics.page(to.path);
        if (!hasQueryParams(to) && hasQueryParams(from)) {
            next({
                path: to.path,
                query: from.query
            });
            return;
        }
        else {
            next();
        }
    }
    next();
});
exports["default"] = router;
