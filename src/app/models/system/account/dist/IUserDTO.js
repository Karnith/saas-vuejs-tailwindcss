"use strict";
exports.__esModule = true;
exports.UserType = exports.LoginType = void 0;
var LoginType;
(function (LoginType) {
    LoginType[LoginType["Password"] = 0] = "Password";
    LoginType[LoginType["Gmail"] = 1] = "Gmail";
})(LoginType = exports.LoginType || (exports.LoginType = {}));
var UserType;
(function (UserType) {
    UserType[UserType["Admin"] = 0] = "Admin";
    UserType[UserType["Tenant"] = 1] = "Tenant";
})(UserType = exports.UserType || (exports.UserType = {}));
