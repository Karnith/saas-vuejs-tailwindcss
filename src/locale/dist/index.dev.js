"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _enUS = _interopRequireDefault(require("./en-US"));

var _esMX = _interopRequireDefault(require("./es-MX"));

var _hiIN = _interopRequireDefault(require("./hi-IN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* ============
 * Locale
 * ============
 *
 * For a multi-language application, you can
 * specify the languages you want to use here.
 */
var _default = {
  en: _enUS["default"],
  es: _esMX["default"],
  hi: _hiIN["default"]
};
exports["default"] = _default;