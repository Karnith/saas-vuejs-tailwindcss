"use strict";

exports.__esModule = true;
exports.account = exports.state = void 0;
exports.state = {
  user: null
};
exports.account = {
  namespaced: true,
  state: exports.state,
  getters: {
    avatar: function avatar(state) {
      if (state.user) {
        return state.user.avatar;
      }

      return "";
    },
    avatarText: function avatarText(state) {
      if (state.user) {
        if (state.user.firstName && state.user.lastName) {
          if (state.user.firstName.length > 0 && state.user.lastName.length > 0) {
            return (state.user.firstName[0] + state.user.lastName[0]).toUpperCase();
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
    profileName: function profileName(state) {
      if (state.user) {
        if (state.user.firstName && state.user.lastName) {
          return state.user.firstName + " " + state.user.lastName;
        } else {
          return state.user.email;
        }
      }

      return "--";
    },
    role: function role(state) {
      if (state.user) {
        return state.user.role;
      }

      return "--";
    }
  },
  actions: {
    logged: function logged(_a, user) {
      var commit = _a.commit;
      commit("logged", user);
    }
  },
  mutations: {
    reset: function reset(state) {
      state.user = null;
    },
    logged: function logged(state, user) {
      state.user = user;
    }
  }
};