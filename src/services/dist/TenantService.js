"use strict";
exports.__esModule = true;
exports.tenantService = void 0;
var axios_helper_1 = require("../plugins/axios-helper");
var store_1 = require("@/store");
var theme_1 = require("@/store/modules/theme");
var TenantService = /** @class */ (function () {
    function TenantService() {
    }
    TenantService.prototype.getMyTenants = function () {
        return new Promise(function (resolve, reject) {
            var _a;
            axios_helper_1["default"]
                .get("tenant/MyTenants/" + ((_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey), {
                masterDatabase: true
            })
                .then(function (response) {
                store_1["default"].commit("tenant/myTenants", response.data);
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    TenantService.prototype.update = function (payload, apiKey) {
        var _a;
        if (!apiKey) {
            apiKey = (_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey;
        }
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .put("tenant/UpdateTenant/" + apiKey, payload, { masterDatabase: true })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    TenantService.prototype.uploadImage = function (payload, type) {
        return new Promise(function (resolve, reject) {
            var _a;
            axios_helper_1["default"]
                .put("tenant/uploadImage/" + ((_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey) +
                "/" +
                type, payload, { masterDatabase: true })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    TenantService.prototype.create = function (name, stripePrice, stripeCardToken) {
        var newTenant = {
            name: name,
            stripePrice: stripePrice,
            stripeCardToken: stripeCardToken,
            appTheme: theme_1.defaultState.appTheme,
            appColor: theme_1.defaultState.appColor
        };
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .post("tenant/create", newTenant, { masterDatabase: true })
                .then(function (response) {
                store_1["default"].commit("auth/login", response.data);
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    TenantService.prototype.changeDefault = function (apikey) {
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .post("tenant/changeDefault/" + apikey, null, { masterDatabase: true })
                .then(function (response) {
                store_1["default"].commit("tenant/current", response.data.currentTenant);
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    TenantService.prototype.getInvitation = function (uuid) {
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .get("tenant/invitation/" + uuid, {
                masterDatabase: true
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    TenantService.prototype.getUsers = function (apiKey) {
        var _a;
        if (!apiKey) {
            apiKey = (_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey;
        }
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .get("tenant/users/" + apiKey, {
                masterDatabase: true
            })
                .then(function (response) {
                store_1["default"].commit("tenant/members", response.data);
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    TenantService.prototype.getUser = function (id) {
        return new Promise(function (resolve, reject) {
            var _a;
            axios_helper_1["default"]
                .get("tenant/user/" + ((_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey) + "/" + id, {
                masterDatabase: true
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    TenantService.prototype.deleteUser = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            axios_helper_1["default"]["delete"]("tenant/deleteUser/" + ((_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey) + "/" + id, {
                masterDatabase: true
            })
                .then(function (response) {
                _this.getUsers();
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    TenantService.prototype.inviteUser = function (payload, apiKey) {
        var _a;
        if (!apiKey) {
            apiKey = (_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey;
        }
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .post("tenant/invite/" + apiKey, payload, {
                masterDatabase: true
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    TenantService.prototype.updateUser = function (payload, apiKey) {
        var _a;
        if (!apiKey) {
            apiKey = (_a = store_1["default"].state.tenant.current) === null || _a === void 0 ? void 0 : _a.apiKey;
        }
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .put("tenant/updateUser/" + apiKey, payload, { masterDatabase: true })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    return TenantService;
}());
exports.tenantService = new TenantService();
