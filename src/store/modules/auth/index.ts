import Services from "@/services";
import store from "@/store";
import router from "@/router";
import { Module } from "vuex";
import { AuthState, RootState } from "@/types/stateTypes";
import { SignalService } from "@/plugins/SignalR";
import mixpanel from "mixpanel-browser";
import LogRocket from "logrocket";
import { IUserDTO, UserType } from "@/app/models/system/account/IUserDTO";

export const state: AuthState = {
  authenticated: false,
  token: "",
};
export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  actions: {
    logout({ commit, rootState }, payload) {
      commit("logout");
      router.push("/account/login");
    },
  },
  mutations: {
    login: (state: AuthState, payload) => {
      SignalService.startConnection();

      state.authenticated = true;
      state.token = payload.token;
      localStorage.setItem("id_token", state.token);

      store.dispatch("account/logged", payload.user);
      store.commit("tenant/myTenants", payload.myTenants);
      store.commit("tenant/current", payload.currentTenant);

      try {
        // @ts-ignore
        if (window.analytics) {
          // @ts-ignore
          window.analytics.identify(payload.user.username, {
            email: payload.user.email,
            firstName: payload.user.firstName,
            lastName: payload.user.lastName,
            type: payload.user.type,
            tenant: payload.currentTenant,
          });
        }
        if (mixpanel) {
          mixpanel.identify(payload.user.Id);
          if (mixpanel.people) {
            mixpanel.people.set({
              USER_ID: payload.user.Id,
              $email: payload.user.email,
              "First name": payload.user.firstName,
              "Last name": payload.user.lastName,
            });
          }
          mixpanel.track("Login");
        }
        if (LogRocket) {
          LogRocket.identify(payload.user.email, {
            username: payload.user.username,
            firstName: payload.user.firstName,
            lastName: payload.user.lastName,
            email: payload.user.email,
            stripeCustomerId: payload.currentTenant?.stripeCustomerId ?? "",
            stripeSubscriptionId:
              payload.currentTenant?.stripeSubscriptionId ?? "",
          });
        }
      } catch (ex) {
        // ignore
      }
      if ((payload.user as IUserDTO).type === UserType.Admin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/app/dashboard");
      }
    },
    logout: (state: AuthState) => {
      state.authenticated = false;
      state.token = "";
      localStorage.removeItem("id_token");

      if (mixpanel) {
        try {
          mixpanel.track("Logout");
        } catch (ex) {
          // ignore
        }
      }
      SignalService.closeConnection();
      store.commit("locale/reset");
      store.commit("account/reset");
      store.commit("pricing/reset");
      store.commit("tenant/reset");
      store.commit("theme/reset");
    },
  },
};
