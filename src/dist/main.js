"use strict";
exports.__esModule = true;
exports.app = void 0;
var vue_1 = require("vue");
var App_vue_1 = require("@/App.vue");
var router_1 = require("@/router");
var store_1 = require("@/store");
require("@/registerServiceWorker");
// Tailwind
require("@/assets/css/out.css");
require("@/assets/css/styles.css");
// ----------Plugins
require("@/plugins/vuex");
require("@/plugins/axios-helper");
require("@/plugins/toast");
require("@/plugins/event-bus");
require("@/plugins/integrations");
require("@/plugins/directives");
var vue_i18n_1 = require("@/plugins/vue-i18n");
var moment_1 = require("moment");
vue_1["default"].prototype.moment = moment_1["default"];
// ----------Icons
var fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var vue_fontawesome_1 = require("@fortawesome/vue-fontawesome");
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faUserSecret);
vue_1["default"].component("font-awesome-icon", vue_fontawesome_1.FontAwesomeIcon);
vue_1["default"].config.productionTip = false;
exports.app = new vue_1["default"]({
    i18n: vue_i18n_1.i18n,
    router: router_1["default"],
    store: store_1["default"],
    render: function (h) { return h(App_vue_1["default"]); }
}).$mount("#app");
