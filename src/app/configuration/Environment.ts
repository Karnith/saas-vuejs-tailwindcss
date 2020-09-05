import { Integrations } from "./Integrations";

const env = process.env;
export class Environment {
  serverUrl: string;
  apiUrl: string;
  language: string;
  appTheme: string;
  appColor: string;
  marketingTheme: string;
  marketingColor: string;
  secretSignInKey: string;
  googleClientId: string;
  integrations: Integrations;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  blogGhostUrl: string;
  blogGhostContentApiKey: string;
  stripePublishableKey: string;
  stripeSecretKey: string;
  constructor() {
    this.serverUrl = env.VUE_APP_SERVER_URL?.toString() || "";
    this.apiUrl = env.VUE_APP_API_URL?.toString() || "";
    this.language = env.VUE_APP_LANGUAGE?.toString() || "";
    this.appTheme = env.VUE_APP_THEME?.toString() || "";
    this.appColor = env.VUE_APP_COLOR?.toString() || "";
    this.marketingTheme = env.VUE_APP_THEME_MARKETING_THEME?.toString() || "";
    this.marketingColor = env.VUE_APP_THEME_MARKETING_COLOR?.toString() || "";
    this.secretSignInKey = env.VUE_APP_SECRETSIGNINKEY?.toString() || "";
    this.googleClientId = env.VUE_APP_GOOGLE_CLIENT_ID_OAUTH2?.toString() || "";
    this.facebookUrl = env.VUE_APP_SOCIAL_FACEBOOK?.toString() || "";
    this.instagramUrl = env.VUE_APP_SOCIAL_INSTAGRAM?.toString() || "";
    this.twitterUrl = env.VUE_APP_SOCIAL_TWITTER?.toString() || "";
    this.blogGhostUrl = env.VUE_APP_BLOG_GHOST_URL?.toString() || "";
    this.blogGhostContentApiKey =
      env.VUE_APP_BLOG_GHOST_CONTENT_API_KEY?.toString() || "";
    this.stripePublishableKey =
      env.VUE_APP_STRIPE_PUBLISHABLE_KEY?.toString() || "";
    this.stripeSecretKey = env.VUE_APP_STRIPE_SECRET_KEY?.toString() || "";

    this.integrations = new Integrations();
  }
}
