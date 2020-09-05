"use strict";
exports.__esModule = true;
exports.userService = void 0;
var axios_helper_1 = require("../plugins/axios-helper");
var store_1 = require("@/store");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.updateProfile = function (payload) {
        return new Promise(function (resolve, reject) {
            var _a;
            axios_helper_1["default"]
                .put("users/UpdateProfile/" + ((_a = store_1["default"].state.account.user) === null || _a === void 0 ? void 0 : _a.id), payload, {
                masterDatabase: true
            })
                .then(function (response) {
                store_1["default"].commit("account/logged", response.data);
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.uploadAvatar = function (avatar) {
        return new Promise(function (resolve, reject) {
            var _a;
            axios_helper_1["default"]
                .put("users/uploadAvatar/" + ((_a = store_1["default"] === null || store_1["default"] === void 0 ? void 0 : store_1["default"].state.account.user) === null || _a === void 0 ? void 0 : _a.id), { avatar: avatar }, {
                masterDatabase: true
            })
                .then(function (response) {
                store_1["default"].commit("account/logged", response.data);
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.updatePassword = function (payload) {
        return new Promise(function (resolve, reject) {
            var _a;
            axios_helper_1["default"]
                .put("users/UpdatePassword/" + ((_a = store_1["default"].state.account.user) === null || _a === void 0 ? void 0 : _a.id), payload, {
                masterDatabase: true
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    return UserService;
}());
exports.userService = new UserService();
