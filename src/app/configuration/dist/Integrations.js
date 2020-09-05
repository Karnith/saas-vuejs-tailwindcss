"use strict";
exports.__esModule = true;
exports.Integrations = void 0;
var env = process.env;
var Integrations = /** @class */ (function () {
    function Integrations() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.conversationsIntercom =
            ((_a = env.VUE_APP_INTEGRATIONS_CONVERSATIONS_INTERCOM) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        this.conversationsDrift =
            ((_b = env.VUE_APP_INTEGRATIONS_CONVERSATIONS_DRIFT) === null || _b === void 0 ? void 0 : _b.toString()) || "";
        this.analyticsGoogle =
            ((_c = env.VUE_APP_INTEGRATIONS_ANALYTICS_GOOGLE) === null || _c === void 0 ? void 0 : _c.toString()) || "";
        this.analyticsMixpanel =
            ((_d = env.VUE_APP_INTEGRATIONS_ANALYTICS_MIXPANEL) === null || _d === void 0 ? void 0 : _d.toString()) || "";
        this.analyticsHotjar =
            ((_e = env.VUE_APP_INTEGRATIONS_ANALYTICS_HOTJAR) === null || _e === void 0 ? void 0 : _e.toString()) || "";
        this.loggingSentry =
            ((_f = env.VUE_APP_INTEGRATIONS_LOGGING_SENTRY) === null || _f === void 0 ? void 0 : _f.toString()) || "";
        this.loggingLogrocket =
            ((_g = env.VUE_APP_INTEGRATIONS_LOGGING_LOGROCKET) === null || _g === void 0 ? void 0 : _g.toString()) || "";
        this.newsletter =
            ((_h = env.VUE_APP_INTEGRATIONS_NEWSLETTER_MAILCHIMP) === null || _h === void 0 ? void 0 : _h.toString()) || "";
        this.contact = ((_j = env.VUE_APP_INTEGRATIONS_CONTACT_FORMSPREE) === null || _j === void 0 ? void 0 : _j.toString()) || "";
    }
    return Integrations;
}());
exports.Integrations = Integrations;
