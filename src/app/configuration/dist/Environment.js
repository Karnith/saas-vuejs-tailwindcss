"use strict";
exports.__esModule = true;
exports.Environment = void 0;
var Integrations_1 = require("./Integrations");
var env = process.env;
var Environment = /** @class */ (function () {
    function Environment() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        this.serverUrl = ((_a = env.VUE_APP_SERVER_URL) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        this.apiUrl = ((_b = env.VUE_APP_API_URL) === null || _b === void 0 ? void 0 : _b.toString()) || "";
        this.language = ((_c = env.VUE_APP_LANGUAGE) === null || _c === void 0 ? void 0 : _c.toString()) || "";
        this.appTheme = ((_d = env.VUE_APP_THEME) === null || _d === void 0 ? void 0 : _d.toString()) || "";
        this.appColor = ((_e = env.VUE_APP_COLOR) === null || _e === void 0 ? void 0 : _e.toString()) || "";
        this.marketingTheme = ((_f = env.VUE_APP_THEME_MARKETING_THEME) === null || _f === void 0 ? void 0 : _f.toString()) || "";
        this.marketingColor = ((_g = env.VUE_APP_THEME_MARKETING_COLOR) === null || _g === void 0 ? void 0 : _g.toString()) || "";
        this.secretSignInKey = ((_h = env.VUE_APP_SECRETSIGNINKEY) === null || _h === void 0 ? void 0 : _h.toString()) || "";
        this.googleClientId = ((_j = env.VUE_APP_GOOGLE_CLIENT_ID_OAUTH2) === null || _j === void 0 ? void 0 : _j.toString()) || "";
        this.facebookUrl = ((_k = env.VUE_APP_SOCIAL_FACEBOOK) === null || _k === void 0 ? void 0 : _k.toString()) || "";
        this.instagramUrl = ((_l = env.VUE_APP_SOCIAL_INSTAGRAM) === null || _l === void 0 ? void 0 : _l.toString()) || "";
        this.twitterUrl = ((_m = env.VUE_APP_SOCIAL_TWITTER) === null || _m === void 0 ? void 0 : _m.toString()) || "";
        this.blogGhostUrl = ((_o = env.VUE_APP_BLOG_GHOST_URL) === null || _o === void 0 ? void 0 : _o.toString()) || "";
        this.blogGhostContentApiKey =
            ((_p = env.VUE_APP_BLOG_GHOST_CONTENT_API_KEY) === null || _p === void 0 ? void 0 : _p.toString()) || "";
        this.stripePublishableKey =
            ((_q = env.VUE_APP_STRIPE_PUBLISHABLE_KEY) === null || _q === void 0 ? void 0 : _q.toString()) || "";
        this.stripeSecretKey = ((_r = env.VUE_APP_STRIPE_SECRET_KEY) === null || _r === void 0 ? void 0 : _r.toString()) || "";
        this.integrations = new Integrations_1.Integrations();
    }
    return Environment;
}());
exports.Environment = Environment;
