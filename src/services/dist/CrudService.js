"use strict";
exports.__esModule = true;
exports.CrudService = void 0;
var axios_helper_1 = require("../plugins/axios-helper");
var CrudService = /** @class */ (function () {
    function CrudService(controller, tenantDatabase) {
        this.tenantDatabase = true;
        this.controller = controller + "";
        this.tenantDatabase = tenantDatabase;
    }
    CrudService.prototype.get = function (id) {
        var _this = this;
        if (id === void 0) { id = 0; }
        var url = this.controller + (id > 0 ? "/find/" + id : "");
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .get(url, {
                masterDatabase: !_this.tenantDatabase
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    CrudService.prototype.post = function (object) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .post(_this.controller, object, {
                masterDatabase: !_this.tenantDatabase
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    CrudService.prototype.put = function (id, object) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]
                .put(_this.controller + "?id=" + id, object, {
                masterDatabase: !_this.tenantDatabase
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    CrudService.prototype["delete"] = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_helper_1["default"]["delete"](_this.controller + "?id=" + id, {
                masterDatabase: !_this.tenantDatabase
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    return CrudService;
}());
exports.CrudService = CrudService;
