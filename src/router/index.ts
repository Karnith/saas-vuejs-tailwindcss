import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import routes from "./routes";
import { StripeProduct } from "@/app/models/subscription/StripeProduct";
import { TenantUserRole } from "@/app/models/system/account/ITenantDTO";
import { UserType } from "@/app/models/system/account/IUserDTO";

import VueMeta from "vue-meta";
Vue.use(VueRouter);
Vue.use(VueMeta);

const router = new VueRouter({
  mode: "history",
  routes,
});

function hasQueryParams(route) {
  return !!Object.keys(route.query).length;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.authenticated) {
      next({
        path: "/account/login",
        query: {
          redirect: to.fullPath,
        },
      });
      return;
    }
    // else if (!store.state.tenant.current) {
    //   next({
    //     path: "/organizations",
    //   });
    //   return;
    // }
  } else if (to.matched.some((record) => record.meta.requiresLoggedOut)) {
    if (store.state.auth.authenticated) {
      next({
        path: "/app/dashboard",
        query: {
          redirect: to.fullPath,
        },
      });
      return;
    }
  }

  // Subscription-based permissions
  if (to.matched.some((record) => record.meta && record.meta.subscriptions)) {
    // console.log("WILL CHECK SUBSCRIPTION PERMISSIONS");
    if (store.state.tenant.myProducts.length === 0) {
      next({
        path: "/app/settings/organization/subscription",
      });
      return;
    }

    const subscriptionsAllowed = to.meta.subscriptions as StripeProduct[];
    const currentSubscription = store.state.tenant.myProducts[0].product;
    // console.log(
    //   "SUBSCRIPTIONS ALLOWED:" + JSON.stringify(subscriptionsAllowed)
    // );
    // console.log("CURRENT SUBSCRIPTION:" + JSON.stringify(currentSubscription));
    if (
      subscriptionsAllowed.some((f) => f.tier === currentSubscription?.tier) ===
      false
    ) {
      // console.log("unauthorized");
      next({
        path: "/app/unauthorized",
      });
      return;
    }
  }

  const userTypesAllowed = to.meta.userTypes as UserType[];
  if (
    to.matched.some((record) => record.meta && record.meta.userTypes) &&
    userTypesAllowed
  ) {
    // console.log("WILL CHECK USER TYPES");
    const currentType = store.state.account.user?.type as UserType;
    // console.log("USER TYPES ALLOWED:" + JSON.stringify(userTypesAllowed));
    // console.log("CURRENT USER TYPE:" + JSON.stringify(currentType));
    if (userTypesAllowed.some((f) => f === currentType) === false) {
      console.log("unauthorized");
      next({
        path: "/app/unauthorized",
      });
      return;
    }
  }

  const rolesAllowed = to.meta.roles as TenantUserRole[];
  if (
    to.matched.some((record) => record.meta && record.meta.roles) &&
    rolesAllowed
  ) {
    // console.log("WILL CHECK ROLE PERMISSIONS");
    const currentRole = store.state.tenant.current?.currentUser
      ?.role as TenantUserRole;
    // console.log("ROLES ALLOWED:" + JSON.stringify(rolesAllowed));
    // console.log("CURRENT ROLE:" + JSON.stringify(currentRole));
    if (rolesAllowed.some((f) => f === currentRole) === false) {
      // console.log("unauthorized");
      next({
        path: "/app/unauthorized",
      });
      return;
    }
  }

  if (to.path.includes("pricing") || to.path.includes("register")) {
    // @ts-ignore
    if (window.analytics) {
      // @ts-ignore
      window.analytics.page(to.path);
    }
    if (!hasQueryParams(to) && hasQueryParams(from)) {
      next({
        path: to.path,
        query: from.query,
      });
      return;
    } else {
      next();
    }
  }

  next();
});
export default router;
