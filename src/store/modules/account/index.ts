import { Module } from "vuex";
import { AccountState, RootState } from "@/types/stateTypes";
import {
  IUserDTO,
  LoginType,
  UserType,
} from "@/app/models/system/account/IUserDTO";

export const state: AccountState = {
  user: null,
};
export const account: Module<AccountState, RootState> = {
  namespaced: true,
  state,
  getters: {
    isAdmin: (state: AccountState) => {
      return state.user && state.user.type === UserType.Admin;
    },
    avatar: (state: AccountState) => {
      if (state.user) {
        return state.user.avatar;
      }
      return "";
    },
    avatarText: (state: AccountState) => {
      if (state.user) {
        if (state.user.firstName && state.user.lastName) {
          if (
            state.user.firstName.length > 0 &&
            state.user.lastName.length > 0
          ) {
            return (
              state.user.firstName[0] + state.user.lastName[0]
            ).toUpperCase();
          } else if (state.user.firstName.length > 1) {
            return state.user.firstName.substring(0, 2).toUpperCase();
          } else if (state.user.email.length > 1) {
            return state.user.email.substring(0, 2).toUpperCase();
          }
        } else {
          return state.user.email.substring(0, 2).toUpperCase();
        }
      }
      return "--";
    },
    profileName: (state: AccountState) => {
      if (state.user) {
        if (state.user.firstName && state.user.lastName) {
          return state.user.firstName + " " + state.user.lastName;
        } else {
          return state.user.email;
        }
      }
      return "--";
    },
    email: (state: AccountState) => {
      if (state.user) {
        return state.user.email;
      }
      return "";
    },
    role: (state: AccountState) => {
      if (state.user) {
        return state.user.type;
      }
      return "--";
    },
  },
  actions: {
    logged({ commit }, user) {
      commit("logged", user);
    },
  },
  mutations: {
    reset(state: AccountState) {
      state.user = null;
    },
    logged(state: AccountState, user: IUserDTO) {
      state.user = user;
    },
  },
};
