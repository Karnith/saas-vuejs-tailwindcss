const env = process.env;
export class Integrations {
  conversationsIntercom: string;
  conversationsDrift: string;
  analyticsGoogle: string;
  analyticsMixpanel: string;
  analyticsHotjar: string;
  loggingSentry: string;
  loggingLogrocket: string;
  newsletter: string;
  contact: string;
  constructor() {
    this.conversationsIntercom =
      env.VUE_APP_INTEGRATIONS_CONVERSATIONS_INTERCOM?.toString() || "";
    this.conversationsDrift =
      env.VUE_APP_INTEGRATIONS_CONVERSATIONS_DRIFT?.toString() || "";
    this.analyticsGoogle =
      env.VUE_APP_INTEGRATIONS_ANALYTICS_GOOGLE?.toString() || "";
    this.analyticsMixpanel =
      env.VUE_APP_INTEGRATIONS_ANALYTICS_MIXPANEL?.toString() || "";
    this.analyticsHotjar =
      env.VUE_APP_INTEGRATIONS_ANALYTICS_HOTJAR?.toString() || "";
    this.loggingSentry =
      env.VUE_APP_INTEGRATIONS_LOGGING_SENTRY?.toString() || "";
    this.loggingLogrocket =
      env.VUE_APP_INTEGRATIONS_LOGGING_LOGROCKET?.toString() || "";
    this.newsletter =
      env.VUE_APP_INTEGRATIONS_NEWSLETTER_MAILCHIMP?.toString() || "";
    this.contact = env.VUE_APP_INTEGRATIONS_CONTACT_FORMSPREE?.toString() || "";
  }
}
