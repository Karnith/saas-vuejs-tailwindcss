"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var router_1 = require("@/router");
var debug = process.env.NODE_ENV !== "production";
// Google
var vue_analytics_1 = require("vue-analytics");
vue_1["default"].use(vue_analytics_1["default"], {
    id: process.env.VUE_APP_INTEGRATIONS_ANALYTICS_GOOGLE,
    router: router_1["default"]
});
// Mixpanel
// @ts-ignore
var mixpanel = require("mixpanel-browser");
mixpanel.init(process.env.VUE_APP_INTEGRATIONS_ANALYTICS_MIXPANEL);
vue_1["default"].use(mixpanel);
// Hotjar
// import Hotjar from "vue-hotjar";
// Vue.use(Hotjar, {
//   id: process.env.VUE_APP_INTEGRATIONS_ANALYTICS_HOTJAR,
//   isProduction: !debug,
// });
