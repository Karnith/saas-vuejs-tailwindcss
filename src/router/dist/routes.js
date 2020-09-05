"use strict";
exports.__esModule = true;
var accountRoutes_1 = require("./accountRoutes");
var adminRoutes_1 = require("./adminRoutes");
var appRoutes_1 = require("./appRoutes");
var routes = [
    {
        path: "*",
        redirect: "/app/dashboard"
    },
    {
        path: "/",
        redirect: "/product"
    },
    {
        path: "/",
        component: require("@/views/marketing/Index.vue")["default"],
        children: [
            {
                path: "product",
                component: require("@/views/marketing/Product.vue")["default"]
            },
            {
                path: "pricing",
                component: require("@/views/marketing/Pricing.vue")["default"]
            },
            {
                path: "contact",
                component: require("@/views/marketing/Contact.vue")["default"]
            },
            {
                path: "blog",
                component: require("@/views/marketing/Blog.vue")["default"]
            },
            {
                path: "blog/:slug",
                component: require("@/views/marketing/BlogPost.vue")["default"]
            },
            {
                path: "es",
                redirect: "lang/es-MX"
            },
            {
                path: "mx",
                redirect: "lang/es-MX"
            },
            {
                path: "en",
                redirect: "lang/en-US"
            },
            {
                path: "hi",
                redirect: "lang/hi-IN"
            },
            {
                path: "in",
                redirect: "lang/hi-IN"
            },
            {
                path: "lang/:lang",
                component: require("@/views/marketing/Lang.vue")["default"]
            },
            {
                path: "/account",
                component: require("@/views/account/Index.vue")["default"],
                meta: {
                    requiresLoggedOut: true
                },
                children: [
                    {
                        path: "login",
                        component: require("@/views/account/Login.vue")["default"]
                    },
                    {
                        path: "register",
                        component: require("@/views/account/Register.vue")["default"]
                    },
                    {
                        path: "verify",
                        component: require("@/views/account/Verify.vue")["default"]
                    },
                    {
                        path: "reset",
                        component: require("@/views/account/Reset.vue")["default"]
                    },
                ]
            },
        ]
    },
    accountRoutes_1.accountRoutes,
    appRoutes_1.appRoutes,
    adminRoutes_1.adminRoutes,
    {
        path: "/terms",
        component: require("@/views/marketing/Terms.vue")["default"]
    },
    {
        path: "/privacy",
        component: require("@/views/marketing/Privacy.vue")["default"]
    },
];
exports["default"] = routes;
