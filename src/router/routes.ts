import { RouteConfig } from "vue-router";
import { i18n } from "@/plugins/vue-i18n";
import { accountRoutes } from "./accountRoutes";
import { adminRoutes } from "./adminRoutes";
import { appRoutes } from "./appRoutes";

const routes: RouteConfig[] = [
  {
    path: "*",
    redirect: "/app/dashboard",
  },
  {
    path: "/",
    redirect: "/product",
  },
  {
    path: "/",
    component: require("@/views/marketing/Index.vue").default,
    children: [
      {
        path: "product",
        component: require("@/views/marketing/Product.vue").default,
      },
      {
        path: "pricing",
        component: require("@/views/marketing/Pricing.vue").default,
      },
      {
        path: "contact",
        component: require("@/views/marketing/Contact.vue").default,
      },
      {
        path: "blog",
        component: require("@/views/marketing/Blog.vue").default,
      },
      {
        path: "blog/:slug",
        component: require("@/views/marketing/BlogPost.vue").default,
      },
      {
        path: "es",
        redirect: "lang/es-MX",
      },
      {
        path: "mx",
        redirect: "lang/es-MX",
      },
      {
        path: "en",
        redirect: "lang/en-US",
      },
      {
        path: "hi",
        redirect: "lang/hi-IN",
      },
      {
        path: "in",
        redirect: "lang/hi-IN",
      },
      {
        path: "lang/:lang",
        component: require("@/views/marketing/Lang.vue").default,
      },
      accountRoutes,
    ],
  },
  appRoutes,
  adminRoutes,
  {
    path: "/terms",
    component: require("@/views/marketing/Terms.vue").default,
  },
  {
    path: "/privacy",
    component: require("@/views/marketing/Privacy.vue").default,
  },
  {
    path: "/invitation",
    component: require("@/views/account/Invitation.vue").default,
  },
  {
    path: "/invite/:linkUrl",
    component: require("@/views/account/InviteURL.vue").default,
  },
];
export default routes;
