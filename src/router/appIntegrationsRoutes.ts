export const appIntegrationsRoutes = {
  path: "integrations",
  meta: {
    requiresAuth: true,
    title: "Integracions",
  },
  component: require("@/views/app/integrations/Index.vue").default,
  children: [
    {
      path: "signalr",
      name: "integrations.signalr",
      component: require("@/views/app/integrations/SignalR.vue").default,
      meta: {
        title: "SignalR (Chat)",
      },
    },
    {
      path: "charts",
      name: "integrations.charts",
      component: require("@/views/app/integrations/Charts.vue").default,
      meta: {
        title: "Charts",
      },
    },
  ],
};
