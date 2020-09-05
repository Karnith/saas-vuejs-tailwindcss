/* ============
 * Vue i18n
 * ============
 */

import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "@/locale/index.js";
import store from "@/store";

Vue.use(VueI18n);

const dateTimeFormats = {
  en: {
    mini: {
      month: "short",
      day: "numeric",
    },
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    },
  },
  es: {
    mini: {
      month: "short",
      day: "numeric",
    },
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    },
  },
};

export const i18n = new VueI18n({
  locale: store.state.locale
    ? store.state.locale.locale
    : process.env.VUE_APP_LANGUAGE?.toString(),
  fallbackLocale: store.state.locale
    ? store.state.locale.locale
    : process.env.VUE_APP_LANGUAGE?.toString(),
  messages,
  dateTimeFormats,
  silentFallbackWarn: true,
});

export default {
  i18n,
};
