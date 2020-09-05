<template>
  <div>
    <span class="  rounded-md shadow-sm w-full ">
      <div
        class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mb-4"
      >
        <button
          @click="everyone()"
          type="button"
          class=" w-full  mr-3  items-center px-2 py-2 border border-gray-300 text-lg leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
        >
          Everyone
        </button>
      </div>

      <div
        class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mb-4"
      >
        <div v-for="product in products" :key="product.id">
          <button
            @click="onlyTierAndUp(product)"
            type="button"
            class=" w-full  mr-3  items-center px-2 py-2 border border-gray-300 text-lg leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
          >
            {{ product.title }}
          </button>
        </div>
      </div>
      <div
        class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2"
      >
        <div v-for="role in roleValues" :key="role">
          <button
            @click="onlyRole(role)"
            type="button"
            class="w-full  mr-3  items-center px-2 py-2 border border-gray-300 text-lg leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
          >
            {{ getRoleName(role) }}
          </button>
        </div>
      </div>
    </span>

    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
    <confirm-modal
      ref="confirm-modal"
      v-on:yes="yesUpdateSubscription"
    ></confirm-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import { mapGetters } from "vuex";
import { StripeProduct } from "../../../app/models/subscription/StripeProduct";
import Stripe from "stripe";
import { defaultProducts } from "../../../store/modules/pricing/default-pricing";
import { defaultProductsDevelopment } from "../../../store/modules/pricing/default-pricing.Development";
import { TenantUserRole } from "../../../app/models/system/account/ITenantDTO";
import { toASCII } from "punycode";

@Component({
  components: {},
  computed: {
    ...mapGetters("tenant", {
      activeProduct: "activeProduct",
      subscription: "subscription",
      role: "role",
      roleName: "roleName",
    }),
  },
})
export default class DemoActionsComponent extends BaseComponent {
  public activeProduct!: StripeProduct;
  public role!: TenantUserRole;
  public roleName!: string;
  public subscription!: Stripe.Subscription;
  public products: StripeProduct[] = [];
  public roleKeys: string[] = [];
  public roleValues: string[] = [];
  mounted() {
    this.roleKeys = Object.keys(TenantUserRole).filter(
      (k) => typeof TenantUserRole[k as any] === "number"
    );
    this.roleValues = this.roleKeys.map((k) => TenantUserRole[k as any]); // [0, 1]
    if (process.env.NODE_ENV !== "production") {
      this.products = defaultProductsDevelopment;
    } else {
      this.products = defaultProducts;
    }
  }
  everyone() {
    this.showAllowed();
  }
  //   onlyTier1() {
  //     if (
  //       this.activeProduct.tier >= 1 &&
  //       (!this.subscription || this.subscription.status !== "trialing")
  //     ) {
  //       this.showAllowed();
  //     } else {
  //       this.showNotAllowed();
  //     }
  //   }
  onlyTierAndUp(product: StripeProduct) {
    if (this.activeProduct.tier >= product.tier) {
      this.showAllowed();
    } else {
      this.showNotAllowed();
    }
  }
  getRoleName(role) {
    return TenantUserRole[role];
  }
  onlyRole(role: TenantUserRole) {
    console.log("current: " + this.role);
    console.log("role: " + role);
    if (this.role > role) {
      // @ts-ignore
      this.$refs["error-modal"].show(
        this.$t("account.tenant.only" + TenantUserRole[role])
      );
    } else {
      this.showAllowed();
    }
  }
  showAllowed() {
    // @ts-ignore
    this.$refs["success-modal"].show(this.$t("shared.allowed"));
  }
  showNotAllowed() {
    // @ts-ignore
    this.$refs["confirm-modal"].show(this.$t("shared.upgrade"));
  }
  yesUpdateSubscription() {
    this.$router.push({ path: "/app/settings/organization/subscription" });
  }
}
</script>
