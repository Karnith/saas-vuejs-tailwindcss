import { Module } from "vuex";
import { LocaleState, RootState } from "@/types/stateTypes";

export const state: LocaleState = {
  locale: process.env.VUE_APP_LANGUAGE?.toString() ?? "en-US",
};

export const locale: Module<LocaleState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    reset(state, payload) {
      state.locale = process.env.VUE_APP_LANGUAGE?.toString() ?? "en-US";
    },
    updateLocale(state, locale: string) {
      state.locale = locale;
    },
  },
};
