"use strict";

exports.__esModule = true;
exports.sidebar = void 0;

var vue_i18n_1 = require("@/plugins/vue-i18n");

var IUserDTO_1 = require("@/app/models/system/account/IUserDTO");

exports.sidebar = [{
  title: vue_i18n_1.i18n.t("app.sidebar.manage"),
  items: [{
    title: "Dashboard",
    path: "/app/dashboard",
    icon: "chart-line"
  }, {
    title: "Catalogs",
    open: true,
    icon: "list",
    items: [{
      title: "Expenses",
      path: "/app/expenses",
      icon: "receipt",
      items: []
    }]
  }, {
    title: "Permissions",
    path: "/app/permissions",
    icon: "shield-alt",
    items: [{
      title: "Standard 🔥",
      path: "/app/permissions/subscriptions/standard"
    }, {
      title: "Enterprise 🚀",
      path: "/app/permissions/subscriptions/enterprise"
    }, {
      title: "Unlimited 🦄",
      path: "/app/permissions/subscriptions/unlimited"
    }, {
      title: "Owner",
      path: "/app/permissions/roles/owner"
    }, {
      title: "Admin",
      path: "/app/permissions/roles/admin"
    }, {
      title: "Member",
      path: "/app/permissions/roles/member"
    }]
  }, {
    title: vue_i18n_1.i18n.t("app.navbar.integrations"),
    icon: "external-link-alt",
    items: [{
      title: "SignalR (Chat)",
      path: "/app/integrations/signalr",
      icon: "comments"
    }, // {
    //   title: "Store",
    //   path: "/app/integrations/store",
    //   icon: "database",
    // },
    {
      title: "Charts",
      path: "/app/integrations/charts",
      icon: "chart-bar"
    }]
  }]
}, {
  title: vue_i18n_1.i18n.t("app.navbar.settings"),
  items: [// {
  //   title: i18n.t("app.navbar.tenant"),
  //   path: "/app/settings/organization",
  //   children: [
  {
    title: vue_i18n_1.i18n.t("app.navbar.tenant"),
    path: "/app/settings/organization/general"
  }, {
    title: vue_i18n_1.i18n.t("settings.tenant.subscription.title"),
    path: "/app/settings/organization/subscription"
  }, {
    title: vue_i18n_1.i18n.t("app.navbar.profile"),
    path: "/app/settings/profile"
  }, {
    title: vue_i18n_1.i18n.t("settings.tenant.members.title"),
    path: "/app/settings/organization/members"
  }]
}, {
  title: vue_i18n_1.i18n.t("admin.title"),
  userTypes: [IUserDTO_1.UserType.Admin],
  items: [{
    title: vue_i18n_1.i18n.t("admin.tenants"),
    path: "/admin/tenants"
  }]
}];