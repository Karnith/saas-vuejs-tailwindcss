"use strict";
exports.__esModule = true;
exports.accountRoutes = void 0;
exports.accountRoutes = {
    path: "account",
    children: [
        {
            path: "/login",
            redirect: "/account/login"
        },
        {
            path: "/account/logout",
            component: require("@/views/account/Logout.vue")["default"]
        },
        {
            path: "/account/forgot",
            component: require("@/views/account/Forgot.vue")["default"]
        },
        {
            path: "/account/invitation",
            component: require("@/views/account/Invitation.vue")["default"]
        },
        {
            path: "/register",
            redirect: "/account/register"
        },
    ]
};
