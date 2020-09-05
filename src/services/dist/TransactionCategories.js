"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.transactionService = void 0;
var CrudService_1 = require("./CrudService");
var TransactionCategories = /** @class */ (function (_super) {
    __extends(TransactionCategories, _super);
    function TransactionCategories() {
        return _super.call(this, "TransactionCategories", true) || this;
    }
    return TransactionCategories;
}(CrudService_1.CrudService));
exports.transactionService = new TransactionCategories();
