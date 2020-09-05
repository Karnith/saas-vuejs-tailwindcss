"use strict";
exports.__esModule = true;
exports.appSettingsRoutes = void 0;
var vue_i18n_1 = require("@/plugins/vue-i18n");
var ITenantDTO_1 = require("@/app/models/system/account/ITenantDTO");
exports.appSettingsRoutes = {
    path: "settings",
    component: require("@/views/app/settings/Index.vue")["default"],
    redirect: "settings/profile",
    children: [
        {
            path: "profile",
            component: require("@/views/app/settings/Profile.vue")["default"],
            meta: {
                title: vue_i18n_1.i18n.t("settings.profile.profileTitle")
            }
        },
        {
            path: "organization",
            component: require("@/views/app/settings/tenant/TenantCurrent.vue")["default"],
            meta: {
                title: vue_i18n_1.i18n.t("settings.tenant.title")
            },
            redirect: "organization/general",
            children: [
                {
                    path: "general",
                    name: "tenant.general",
                    component: require("@/components/app/settings/tenant/TenantSettings.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("settings.tenant.general"),
                        roles: [ITenantDTO_1.TenantUserRole.Owner]
                    }
                },
                {
                    path: "subscription",
                    name: "tenant.subscription",
                    component: require("@/components/app/settings/tenant/subscription/TenantSubscription.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("settings.tenant.subscription.title"),
                        roles: [ITenantDTO_1.TenantUserRole.Owner, ITenantDTO_1.TenantUserRole.Admin]
                    }
                },
                {
                    path: "members",
                    name: "tenant.members",
                    component: require("@/components/app/settings/tenant/TenantMembers.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("settings.tenant.members.title"),
                        roles: [ITenantDTO_1.TenantUserRole.Owner, ITenantDTO_1.TenantUserRole.Admin]
                    },
                    children: [
                        {
                            path: "new",
                            component: require("@/components/app/settings/members/MembersForm.vue")["default"]
                        },
                        {
                            path: "edit/:id",
                            component: require("@/components/app/settings/members/MembersForm.vue")["default"]
                        },
                    ]
                },
            ]
        },
    ]
};
