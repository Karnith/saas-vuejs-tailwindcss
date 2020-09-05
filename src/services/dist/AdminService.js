"use strict";
exports.__esModule = true;
exports.adminService = void 0;
var axios_helper_1 = require("../plugins/axios-helper");
var AdminService = /** @class */ (function () {
    function AdminService() {
    }
    AdminService.prototype.getTenants = function () {
        return new Promise(function (resolve, reject) {
            return axios_helper_1["default"]
                .get("admin/tenants", { masterDatabase: true })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    AdminService.prototype.getUsers = function () {
        return new Promise(function (resolve, reject) {
            return axios_helper_1["default"]
                .get("admin/users", { masterDatabase: true })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    AdminService.prototype.deleteTenant = function (id) {
        return axios_helper_1["default"]["delete"]("admin/tenant?id=" + id, { masterDatabase: true });
    };
    AdminService.prototype.deleteUser = function (id) {
        return axios_helper_1["default"].get("admin/users?id=", { masterDatabase: true });
    };
    return AdminService;
}());
exports.adminService = new AdminService();
