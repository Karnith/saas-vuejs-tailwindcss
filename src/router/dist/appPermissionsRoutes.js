"use strict";
exports.__esModule = true;
exports.appPermissionsRoutes = void 0;
var default_pricing_Development_1 = require("@/store/modules/pricing/default-pricing.Development");
var default_pricing_1 = require("@/store/modules/pricing/default-pricing");
var products = process.env.NODE_ENV !== "production"
    ? default_pricing_Development_1.defaultProductsDevelopment
    : default_pricing_1.defaultProducts;
var vue_i18n_1 = require("@/plugins/vue-i18n");
var ITenantDTO_1 = require("@/app/models/system/account/ITenantDTO");
exports.appPermissionsRoutes = {
    path: "permissions",
    component: require("@/views/app/permissions/Index.vue")["default"],
    meta: {
        title: vue_i18n_1.i18n.t("shared.permissions")
    },
    children: [
        {
            path: "subscriptions",
            children: [
                {
                    path: "standard",
                    component: require("@/views/app/permissions/subscriptions/TierStandard.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("shared.permissions")
                    }
                },
                {
                    path: "enterprise",
                    component: require("@/views/app/permissions/subscriptions/TierEnterprise.vue")["default"],
                    meta: {
                        title: "Enterprise",
                        subscriptions: [products[1], products[2]]
                    }
                },
                {
                    path: "unlimited",
                    component: require("@/views/app/permissions/subscriptions/TierUnlimited.vue")["default"],
                    meta: {
                        title: "Unlimited",
                        subscriptions: [products[2]]
                    }
                },
            ]
        },
        {
            path: "roles",
            children: [
                {
                    path: "owner",
                    component: require("@/views/app/permissions/roles/RoleOwner.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("settings.profile.roles.owner"),
                        roles: [ITenantDTO_1.TenantUserRole.Owner]
                    }
                },
                {
                    path: "admin",
                    component: require("@/views/app/permissions/roles/RoleAdmin.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("settings.profile.roles.admin"),
                        roles: [ITenantDTO_1.TenantUserRole.Owner, ITenantDTO_1.TenantUserRole.Admin]
                    }
                },
                {
                    path: "member",
                    component: require("@/views/app/permissions/roles/RoleMember.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("settings.profile.roles.member"),
                        roles: [
                            ITenantDTO_1.TenantUserRole.Owner,
                            ITenantDTO_1.TenantUserRole.Admin,
                            ITenantDTO_1.TenantUserRole.Member,
                        ]
                    }
                },
            ]
        },
    ]
};
