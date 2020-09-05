"use strict";
exports.__esModule = true;
exports.configuration = void 0;
var AppConfiguration = /** @class */ (function () {
    function AppConfiguration() {
        this.env.serverUrl = process.env.VUE_APP_SERVER_URL;
        this.env.apiUrl = process.env.VUE_APP_API_URL;
        this.env.language = process.env.VUE_APP_LANGUAGE;
        this.env.appTheme = process.env.VUE_APP_THEME;
        this.env.appColor = process.env.VUE_APP_COLOR;
        this.env.marketingTheme = process.env.VUE_APP_THEME_MARKETING_THEME;
        this.env.marketingColor = process.env.VUE_APP_THEME_MARKETING_COLOR;
        this.env.secretSignInKey = process.env.VUE_APP_SECRETSIGNINKEY;
        this.env.googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID_OAUTH2;
        this.env.integrations.conversationsIntercom =
            process.env.VUE_APP_INTEGRATIONS_CONVERSATIONS_INTERCOM;
        this.env.integrations.conversationsDrift =
            process.env.VUE_APP_INTEGRATIONS_CONVERSATIONS_DRIFT;
    }
    return AppConfiguration;
}());
exports.configuration = new AppConfiguration();
