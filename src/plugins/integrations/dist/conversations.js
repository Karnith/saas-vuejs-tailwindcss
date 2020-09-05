"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var debug = process.env.NODE_ENV !== "production";
// // Intercom
var vue_intercom_1 = require("vue-intercom");
vue_1["default"].use(vue_intercom_1["default"], {
    appId: process.env.VUE_APP_INTEGRATIONS_CONVERSATIONS_INTERCOM
});
// // Drift
// import VueDrift from "vue-drift";
// Vue.use(VueDrift, {
//   appId: process.env.VUE_APP_INTEGRATIONS_CONVERSATIONS_DRIFT,
//   development: debug,
// });
