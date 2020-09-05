"use strict";
exports.__esModule = true;
exports.authService = void 0;
var axios_helper_1 = require("../plugins/axios-helper");
var store_1 = require("@/store");
var IUserDTO_1 = require("@/app/models/system/account/IUserDTO");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.login = function (payload) {
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .post("auth/login", payload, { masterDatabase: true })
                .then(function (response) {
                store_1["default"].commit("auth/login", response.data);
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    AuthService.prototype.register = function (payload) {
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .post("auth/register", payload, { masterDatabase: true })
                .then(function (response) {
                if (payload.loginType !== IUserDTO_1.LoginType.Password) {
                    store_1["default"].commit("auth/login", response.data);
                }
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    AuthService.prototype.verify = function (payload) {
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .post("auth/verify", payload, { masterDatabase: true })
                .then(function (response) {
                store_1["default"].commit("auth/login", response.data);
                resolve();
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    AuthService.prototype.acceptInvitation = function (payload) {
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .post("auth/acceptInvitation/" + payload.token, payload, {
                masterDatabase: true
            })
                .then(function (response) {
                store_1["default"].commit("auth/login", response.data);
                resolve();
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    AuthService.prototype.reset = function (email) {
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .post("auth/reset/" + email, {
                masterDatabase: true
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    return AuthService;
}());
exports.authService = new AuthService();
