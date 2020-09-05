import { defaultProductsDevelopment } from "@/store/modules/pricing/default-pricing.Development";
import { defaultProducts } from "@/store/modules/pricing/default-pricing";
const products =
  process.env.NODE_ENV !== "production"
    ? defaultProductsDevelopment
    : defaultProducts;
import { i18n } from "@/plugins/vue-i18n";
import { TenantUserRole } from "@/app/models/system/account/ITenantDTO";

export const appPermissionsRoutes = {
  path: "permissions",
  component: require("@/views/app/permissions/Index.vue").default,
  meta: {
    title: i18n.t("shared.permissions"),
  },
  children: [
    {
      path: "subscriptions",
      children: [
        {
          path: "standard",
          component: require("@/views/app/permissions/subscriptions/TierStandard.vue")
            .default,
          meta: {
            title: i18n.t("shared.permissions"),
          },
        },
        {
          path: "enterprise",
          component: require("@/views/app/permissions/subscriptions/TierEnterprise.vue")
            .default,
          meta: {
            title: "Enterprise",
            subscriptions: [products[1], products[2]],
          },
        },
        {
          path: "unlimited",
          component: require("@/views/app/permissions/subscriptions/TierUnlimited.vue")
            .default,
          meta: {
            title: "Unlimited",
            subscriptions: [products[2]],
          },
        },
      ],
    },
    {
      path: "roles",
      children: [
        {
          path: "owner",
          component: require("@/views/app/permissions/roles/RoleOwner.vue")
            .default,
          meta: {
            title: i18n.t("settings.profile.roles.Owner"),
            roles: [TenantUserRole.Owner],
          },
        },
        {
          path: "admin",
          component: require("@/views/app/permissions/roles/RoleAdmin.vue")
            .default,
          meta: {
            title: i18n.t("settings.profile.roles.Admin"),
            roles: [TenantUserRole.Owner, TenantUserRole.Admin],
          },
        },
        {
          path: "member",
          component: require("@/views/app/permissions/roles/RoleMember.vue")
            .default,
          meta: {
            title: i18n.t("settings.profile.roles.Member"),
            roles: [
              TenantUserRole.Owner,
              TenantUserRole.Admin,
              TenantUserRole.Member,
            ],
          },
        },
      ],
    },
  ],
};
