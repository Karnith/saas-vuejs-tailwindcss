"use strict";
exports.__esModule = true;
exports.adminRoutes = void 0;
var vue_i18n_1 = require("@/plugins/vue-i18n");
var IUserDTO_1 = require("@/app/models/system/account/IUserDTO");
exports.adminRoutes = {
    path: "/admin",
    component: require("@/views/admin/Index.vue")["default"],
    meta: {
        title: vue_i18n_1.i18n.t("admin.title")
    },
    redirect: "admin/dashboard",
    userTypes: [IUserDTO_1.UserType.Admin],
    children: [
        {
            path: "dashboard",
            name: "admin.dashboard",
            component: require("@/views/admin/Dashboard.vue")["default"],
            meta: {
                title: vue_i18n_1.i18n.t("shared.dashboard"),
                userTypes: [IUserDTO_1.UserType.Admin]
            }
        },
        {
            path: "tenants",
            name: "admin.tenants",
            component: require("@/views/admin/Tenants.vue")["default"],
            meta: {
                title: vue_i18n_1.i18n.t("admin.tenants"),
                userTypes: [IUserDTO_1.UserType.Admin]
            },
            children: [
                {
                    path: "users/:tenant/:apiKey",
                    name: "admin.users",
                    component: require("@/views/admin/Users.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("admin.users"),
                        userTypes: [IUserDTO_1.UserType.Admin]
                    }
                },
            ]
        },
        {
            path: "products",
            name: "admin.pricing",
            component: require("@/views/admin/pricing/StripeProductsList.vue")["default"],
            meta: {
                title: vue_i18n_1.i18n.t("admin.pricing.title"),
                userTypes: [IUserDTO_1.UserType.Admin]
            },
            children: [
                {
                    path: "new",
                    component: require("@/views/admin/pricing/StripeProductsForm.vue")["default"]
                },
            ]
        },
        {
            path: "products/:uuid",
            name: "admin.product",
            component: require("@/views/admin/pricing/StripeProduct.vue")["default"],
            children: [
                {
                    path: "overview",
                    name: "admin.product.overview",
                    component: require("@/views/admin/pricing/StripeProductOverview.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("models.stripeProduct.object")
                    }
                },
                {
                    path: "edit",
                    name: "admin.product.edit",
                    component: require("@/views/admin/pricing/StripeProductsForm.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("models.stripeProduct.object")
                    }
                },
                {
                    path: "prices",
                    name: "admin.product.prices",
                    component: require("@/views/admin/pricing/StripePrices.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("models.stripePrice.object")
                    },
                    children: [
                        {
                            path: ":uuid/edit",
                            component: require("@/views/admin/pricing/StripePricesForm.vue")["default"]
                        },
                    ]
                },
                {
                    path: "features",
                    name: "admin.product.features",
                    component: require("@/views/admin/pricing/StripeFeatures.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("models.stripeFeature.object")
                    }
                },
            ]
        },
    ]
};
