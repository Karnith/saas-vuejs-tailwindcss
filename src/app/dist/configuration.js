"use strict";
exports.__esModule = true;
exports.configuration = void 0;
var AppConfiguration = /** @class */ (function () {
    function AppConfiguration() {
        this.env.serverUrl = process.env.;
    }
    return AppConfiguration;
}());
exports.configuration = new AppConfiguration();
