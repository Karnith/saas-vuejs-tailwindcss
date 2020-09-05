"use strict";
exports.__esModule = true;
exports.stripeAdminService = void 0;
var axios_helper_1 = require("../plugins/axios-helper");
var StripeAdminService = /** @class */ (function () {
    function StripeAdminService() {
    }
    StripeAdminService.prototype.syncProduct = function (createInStripe, product) {
        return new Promise(function (resolve, reject) {
            return axios_helper_1["default"]
                .post("stripeAdmin/syncProduct/" + createInStripe, product, {
                masterDatabase: true
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    StripeAdminService.prototype.syncPrice = function (createInStripe, price) {
        return new Promise(function (resolve, reject) {
            return axios_helper_1["default"]
                .post("stripeAdmin/syncPrice/" + createInStripe, price, {
                masterDatabase: true
            })
                .then(function (response) {
                resolve(response);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    StripeAdminService.prototype.deleteProduct = function (deleteInStripe, uuid) {
        return axios_helper_1["default"]["delete"]("stripeAdmin/deleteProduct/" + deleteInStripe + "/" + uuid, { masterDatabase: true });
    };
    StripeAdminService.prototype.deletePrice = function (deleteInStripe, uuid) {
        return axios_helper_1["default"].get("stripeAdmin/deletePrice/" + deleteInStripe + "/" + uuid, {
            masterDatabase: true
        });
    };
    return StripeAdminService;
}());
exports.stripeAdminService = new StripeAdminService();
