"use strict";
exports.__esModule = true;
exports.appRoutes = void 0;
var appPermissionsRoutes_1 = require("./appPermissionsRoutes");
var appSettingsRoutes_1 = require("./appSettingsRoutes");
var appIntegrationsRoutes_1 = require("./appIntegrationsRoutes");
var vue_i18n_1 = require("@/plugins/vue-i18n");
exports.appRoutes = {
    path: "/app",
    component: require("@/views/app/Index.vue")["default"],
    meta: {
        requiresAuth: true
    },
    redirect: "/app/dashboard",
    children: [
        {
            path: "dashboard",
            component: require("@/views/app/dashboard/Index.vue")["default"],
            meta: {
                title: vue_i18n_1.i18n.t("shared.dashboard")
            }
        },
        {
            path: "expenses",
            component: require("@/views/app/transactions/Expenses.vue")["default"],
            meta: {
                requiresAuth: true,
                title: "Expenses"
            },
            children: [
                {
                    path: "new",
                    component: require("@/views/app/transactions/ExpensesForm.vue")["default"]
                },
                {
                    path: ":id/edit",
                    component: require("@/views/app/transactions/ExpensesForm.vue")["default"]
                },
            ]
        },
        {
            path: "unauthorized",
            component: require("@/views/app/common/Unauthorized.vue")["default"],
            meta: {
                title: vue_i18n_1.i18n.t("shared.unauthorized")
            }
        },
        appPermissionsRoutes_1.appPermissionsRoutes,
        appSettingsRoutes_1.appSettingsRoutes,
        appIntegrationsRoutes_1.appIntegrationsRoutes,
    ]
};
