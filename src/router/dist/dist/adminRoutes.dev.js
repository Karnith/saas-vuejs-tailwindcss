"use strict";

exports.__esModule = true;
exports.adminRoutes = void 0;

var vue_i18n_1 = require("@/plugins/vue-i18n");

var IUserDTO_1 = require("@/app/models/system/account/IUserDTO");

exports.adminRoutes = {
  path: "/admin",
  component: require("@/views/admin/Index.vue")["default"],
  meta: {
    breadcrumb: [{
      name: vue_i18n_1.i18n.t("admin.title")
    }]
  },
  redirect: "admin/dashboard",
  children: [{
    path: "dashboard",
    name: "admin.dashboard",
    component: require("@/views/admin/Dashboard.vue")["default"],
    meta: {
      title: vue_i18n_1.i18n.t("admin.dashboard"),
      breadcrumb: [{
        name: vue_i18n_1.i18n.t("admin.dashboard")
      }],
      userTypes: [IUserDTO_1.UserType.Admin]
    }
  }, {
    path: "tenants",
    name: "admin.tenants",
    component: require("@/views/admin/Tenants.vue")["default"],
    meta: {
      title: vue_i18n_1.i18n.t("admin.tenants"),
      breadcrumb: [{
        name: vue_i18n_1.i18n.t("admin.tenants")
      }],
      userTypes: [IUserDTO_1.UserType.Admin]
    }
  }, {
    path: "users/:tenant/:apiKey",
    name: "admin.users",
    component: require("@/views/admin/Users.vue")["default"],
    meta: {
      title: vue_i18n_1.i18n.t("admin.users"),
      breadcrumb: [{
        name: vue_i18n_1.i18n.t("admin.users")
      }],
      userTypes: [IUserDTO_1.UserType.Admin]
    }
  }, {
    path: "pricing",
    name: "admin.pricing",
    component: require("@/views/admin/StripeProductsList.vue")["default"],
    meta: {
      title: vue_i18n_1.i18n.t("admin.pricing"),
      breadcrumb: [{
        name: vue_i18n_1.i18n.t("admin.pricing")
      }],
      userTypes: [IUserDTO_1.UserType.Admin]
    },
    children: [{
      path: "new",
      component: require("@/views/admin/StripeProductsForm.vue")["default"]
    }, {
      path: "edit/:id",
      component: require("@/views/admin/StripeProductsForm.vue")["default"]
    }]
  }]
};