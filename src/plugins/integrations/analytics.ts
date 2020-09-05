import Vue from "vue";
import router from "@/router";
const debug = process.env.NODE_ENV !== "production";

// Google
import VueAnalytics from "vue-analytics";
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_INTEGRATIONS_ANALYTICS_GOOGLE,
  router,
});

// Mixpanel
// @ts-ignore
const mixpanel = require("mixpanel-browser");
mixpanel.init(process.env.VUE_APP_INTEGRATIONS_ANALYTICS_MIXPANEL);
Vue.use(mixpanel);

// Hotjar
// import Hotjar from "vue-hotjar";
// Vue.use(Hotjar, {
//   id: process.env.VUE_APP_INTEGRATIONS_ANALYTICS_HOTJAR,
//   isProduction: !debug,
// });
