import { appPermissionsRoutes } from "./appPermissionsRoutes";
import { appSettingsRoutes } from "./appSettingsRoutes";
import { appIntegrationsRoutes } from "./appIntegrationsRoutes";
import { i18n } from "@/plugins/vue-i18n";

export const appRoutes = {
  path: "/app",
  component: require("@/views/app/Index.vue").default,
  meta: {
    requiresAuth: true,
  },
  redirect: "/app/dashboard",
  children: [
    {
      path: "dashboard",
      component: require("@/views/app/dashboard/Index.vue").default,
      meta: {
        title: i18n.t("shared.dashboard"),
      },
    },
    {
      path: "expenses",
      component: require("@/views/app/transactions/Expenses.vue").default,
      meta: {
        requiresAuth: true,
        title: "Expenses",
      },
      children: [
        {
          path: "new",
          component: require("@/views/app/transactions/ExpensesForm.vue")
            .default,
        },
        {
          path: ":id/edit",
          component: require("@/views/app/transactions/ExpensesForm.vue")
            .default,
        },
      ],
    },
    {
      path: "resources",
      component: require("@/views/app/resources/MyResources.vue").default,
      meta: {
        title: i18n.t("models.resource.plural"),
      },
    },
    {
      path: "unauthorized",
      component: require("@/views/app/common/Unauthorized.vue").default,
      meta: {
        title: i18n.t("shared.unauthorized"),
      },
    },
    appPermissionsRoutes,
    appSettingsRoutes,
    appIntegrationsRoutes,
  ],
};
