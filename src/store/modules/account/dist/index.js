"use strict";
exports.__esModule = true;
exports.account = exports.state = void 0;
var IUserDTO_1 = require("@/app/models/system/account/IUserDTO");
exports.state = {
    user: null
};
exports.account = {
    namespaced: true,
    state: exports.state,
    getters: {
        isAdmin: function (state) {
            return state.user && state.user.type === IUserDTO_1.UserType.Admin;
        },
        avatar: function (state) {
            if (state.user) {
                return state.user.avatar;
            }
            return "";
        },
        avatarText: function (state) {
            if (state.user) {
                if (state.user.firstName && state.user.lastName) {
                    if (state.user.firstName.length > 0 &&
                        state.user.lastName.length > 0) {
                        return (state.user.firstName[0] + state.user.lastName[0]).toUpperCase();
                    }
                    else if (state.user.firstName.length > 1) {
                        return state.user.firstName.substring(0, 2).toUpperCase();
                    }
                    else if (state.user.email.length > 1) {
                        return state.user.email.substring(0, 2).toUpperCase();
                    }
                }
                else {
                    return state.user.email.substring(0, 2).toUpperCase();
                }
            }
            return "--";
        },
        profileName: function (state) {
            if (state.user) {
                if (state.user.firstName && state.user.lastName) {
                    return state.user.firstName + " " + state.user.lastName;
                }
                else {
                    return state.user.email;
                }
            }
            return "--";
        },
        role: function (state) {
            if (state.user) {
                return state.user.type;
            }
            return "--";
        }
    },
    actions: {
        logged: function (_a, user) {
            var commit = _a.commit;
            commit("logged", user);
        }
    },
    mutations: {
        reset: function (state) {
            state.user = null;
        },
        logged: function (state, user) {
            state.user = user;
        }
    }
};
