"use strict";

exports.__esModule = true;
exports.appIntegrationsRoutes = void 0;
exports.appIntegrationsRoutes = {
  path: "integrations",
  meta: {
    requiresAuth: true,
    breadcrumb: [{
      name: "Integrations",
      link: "integrations"
    }]
  },
  component: require("@/views/app/integrations/Index.vue")["default"],
  children: [{
    path: "signalr",
    name: "integrations.signalr",
    component: require("@/views/app/integrations/SignalR.vue")["default"],
    meta: {
      title: "SignalR (Chat)",
      breadcrumb: [{
        name: "SignalR"
      }]
    }
  }, {
    path: "store",
    name: "integrations.store",
    component: require("@/views/app/integrations/Store.vue")["default"],
    meta: {
      title: "Store",
      breadcrumb: [{
        name: "Store"
      }]
    }
  }, {
    path: "charts",
    name: "integrations.charts",
    component: require("@/views/app/integrations/Charts.vue")["default"],
    meta: {
      title: "Charts",
      breadcrumb: [{
        name: "Charts"
      }]
    }
  }]
};