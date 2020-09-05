"use strict";
exports.__esModule = true;
exports.appConfiguration = void 0;
var Environment_1 = require("./Environment");
var AppConfiguration = /** @class */ (function () {
    function AppConfiguration() {
        this.env = new Environment_1.Environment();
    }
    return AppConfiguration;
}());
exports.appConfiguration = new AppConfiguration();
