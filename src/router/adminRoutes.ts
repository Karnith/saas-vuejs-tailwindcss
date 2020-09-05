import { i18n } from "@/plugins/vue-i18n";
import { UserType } from "@/app/models/system/account/IUserDTO";

export const adminRoutes = {
  path: "/admin",
  component: require("@/views/admin/Index.vue").default,
  meta: {
    title: i18n.t("admin.title"),
  },
  redirect: "admin/dashboard",
  userTypes: [UserType.Admin],
  children: [
    {
      path: "dashboard",
      name: "admin.dashboard",
      component: require("@/views/admin/Dashboard.vue").default,
      meta: {
        title: i18n.t("shared.dashboard"),
        userTypes: [UserType.Admin],
      },
    },
    {
      path: "tenants",
      name: "admin.tenants",
      component: require("@/views/admin/Tenants.vue").default,
      meta: {
        title: i18n.t("admin.tenants"),
        userTypes: [UserType.Admin],
      },
      children: [
        {
          path: "users/:tenant/:apiKey",
          name: "admin.users",
          component: require("@/views/admin/Users.vue").default,
          meta: {
            title: i18n.t("admin.users"),
            userTypes: [UserType.Admin],
          },
        },
      ],
    },
    {
      path: "products",
      name: "admin.pricing",
      component: require("@/views/admin/pricing/StripeProductsList.vue")
        .default,
      meta: {
        title: i18n.t("admin.pricing.title"),
        userTypes: [UserType.Admin],
      },
      children: [
        {
          path: "new",
          component: require("@/views/admin/pricing/StripeProductsForm.vue")
            .default,
        },
      ],
    },
    {
      path: "product/:uuid",
      name: "admin.product",
      component: require("@/views/admin/pricing/StripeProduct.vue").default,
      children: [
        {
          path: "overview",
          name: "admin.product.overview",
          component: require("@/views/admin/pricing/StripeProductOverview.vue")
            .default,
          meta: {
            title: i18n.t("models.stripeProduct.object"),
          },
        },
        // {
        //   path: "edit",
        //   name: "admin.product.edit",
        //   component: require("@/views/admin/pricing/StripeProductsForm.vue")
        //     .default,
        //   meta: {
        //     title: i18n.t("models.stripeProduct.object"),
        //   },
        // },
        {
          path: "prices",
          name: "admin.product.prices",
          component: require("@/views/admin/pricing/StripePrices.vue").default,
          meta: {
            title: i18n.t("models.stripePrice.object"),
          },
          children: [
            {
              path: ":uuid/edit",
              component: require("@/views/admin/pricing/StripePricesForm.vue")
                .default,
            },
          ],
        },
        {
          path: "features",
          name: "admin.product.features",
          component: require("@/views/admin/pricing/StripeFeatures.vue")
            .default,
          meta: {
            title: i18n.t("models.stripeFeature.object"),
          },
        },
      ],
    },

    {
      path: "resources",
      name: "admin.resources",
      component: require("@/views/admin/resources/ResourcesList.vue").default,
      meta: {
        title: i18n.t("admin.resources.title"),
        userTypes: [UserType.Admin],
      },
      // children: [
      //   {
      //     path: "new",
      //     component: require("@/views/admin/pricing/StripeProductsForm.vue")
      //       .default,
      //   },
      // ],
    },
  ],
};
