export const accountRoutes = {
  path: "/account",
  component: require("@/views/account/Index.vue").default,
  meta: {
    requiresLoggedOut: true,
  },
  children: [
    {
      path: "login",
      component: require("@/views/account/Login.vue").default,
    },
    {
      path: "register",
      component: require("@/views/account/Register.vue").default,
    },
    {
      path: "verify",
      component: require("@/views/account/Verify.vue").default,
    },
    {
      path: "reset",
      component: require("@/views/account/Reset.vue").default,
    },
  ],
};
