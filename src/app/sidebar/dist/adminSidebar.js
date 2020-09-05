"use strict";
exports.__esModule = true;
exports.adminSidebar = void 0;
var vue_i18n_1 = require("../../plugins/vue-i18n");
var IUserDTO_1 = require("../../app/models/system/account/IUserDTO");
exports.adminSidebar = [
    {
        title: vue_i18n_1.i18n.t("app.sidebar.manage"),
        items: [
            {
                title: vue_i18n_1.i18n.t("shared.dashboard"),
                path: "/admin/dashboard",
                icon: "chart-line"
            },
            {
                title: vue_i18n_1.i18n.t("admin.tenants"),
                path: "/admin/tenants",
                icon: "users"
            },
            {
                title: vue_i18n_1.i18n.t("admin.pricing.title"),
                path: "/admin/products",
                icon: "tags"
            },
            {
                title: vue_i18n_1.i18n.t("admin.switchToApp"),
                path: "/app",
                icon: "external-link-alt",
                userTypes: [IUserDTO_1.UserType.Admin]
            },
        ]
    },
];
