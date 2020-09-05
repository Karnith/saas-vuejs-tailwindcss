import Vue from "vue";
const debug = process.env.NODE_ENV !== "production";

// // Intercom
import VueIntercom from "vue-intercom";
Vue.use(VueIntercom, {
  appId: process.env.VUE_APP_INTEGRATIONS_CONVERSATIONS_INTERCOM,
});

// // Drift
// import VueDrift from "vue-drift";
// Vue.use(VueDrift, {
//   appId: process.env.VUE_APP_INTEGRATIONS_CONVERSATIONS_DRIFT,
//   development: debug,
// });
