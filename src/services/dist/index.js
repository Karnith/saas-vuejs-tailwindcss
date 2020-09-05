"use strict";
exports.__esModule = true;
var AuthService_1 = require("./AuthService");
var UserService_1 = require("./UserService");
var TenantService_1 = require("./TenantService");
var StripeService_1 = require("./StripeService");
var ExpensesService_1 = require("./ExpensesService");
var TransactionCategories_1 = require("./TransactionCategories");
var AdminService_1 = require("./AdminService");
var StripeAdminService_1 = require("./StripeAdminService");
var Services = /** @class */ (function () {
    function Services() {
        this.authentication = AuthService_1.authService;
        this.users = UserService_1.userService;
        this.tenants = TenantService_1.tenantService;
        this.stripe = StripeService_1.stripeService;
        this.expenses = ExpensesService_1.expenseService;
        this.transactionCategories = TransactionCategories_1.transactionService;
        this.admin = AdminService_1.adminService;
        this.stripeAdmin = StripeAdminService_1.stripeAdminService;
    }
    return Services;
}());
exports["default"] = new Services();
