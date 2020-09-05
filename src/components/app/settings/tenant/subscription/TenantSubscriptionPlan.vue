<template>
  <div>
    <form @submit.prevent method="POST">
      <div class="shadow sm:rounded-md">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-6">
            <!-- <div id="card-element" class="col-span-6 sm:col-span-6"></div> -->

            <span
              id="listbox-label"
              class="text-sm leading-5 font-medium text-gray-700"
            >{{ $t("shared.current") }}</span>
            <plans v-if="editing" class="col-span-6"></plans>
            <div v-else class="col-span-6 block">
              <div
                v-if="myProducts.length === 0"
                class="-mt-4 block text-right text-medium text-sm text-theme-500 font-medium"
              >{{ $t("settings.tenant.subscription.notSubscribed") }}</div>
              <div v-else v-for="(myProduct, idx) in myProducts" :key="idx">
                <div>
                  <!-- {{myProduct}} -->
                  <span
                    class="-mt-4 block text-right text-medium text-sm text-theme-500 font-medium"
                  >{{ myProduct.product.title }} ${{ myProduct.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            @click="openCustomerPortal"
            class="mx-2 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-theme-600 shadow-sm hover:bg-theme-500 focus:outline-none focus:shadow-outline-blue active:bg-gray-600 transition duration-150 ease-in-out"
          >
            <span>
              {{
              $t("settings.tenant.subscription.openStripePortal")
              }}
            </span>
          </button>
          <button
            @click="editing = !editing"
            class="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-800 bg-gray-200 shadow-sm hover:bg-gray-500 focus:outline-none focus:shadow-outline-blue active:bg-gray-600 transition duration-150 ease-in-out"
          >
            <span>
              {{
              !editing ? $t("marketing.pricing.updateSubscription") : $t("shared.cancel")
              }}
            </span>
          </button>
          <loading-button
            class="ml-3 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-theme-600 shadow-sm hover:bg-theme-500 focus:outline-none focus:shadow-outline-blue active:bg-theme-600 transition duration-150 ease-in-out"
            v-if="editing && saveText"
            @click="updateSubscription"
            ref="loadingButton"
          >{{ saveText }}</loading-button>
        </div>
      </div>
    </form>

    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../../components/shared/BaseComponent.vue";
import LoadingButton from "@/components/shared/buttons/LoadingButton.vue";
import { StripeProduct } from "../../../../../app/models/subscription/StripeProduct";
import Plans from "@/components/marketing/Plans.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import Stripe from "stripe";
import {
  StripePrice,
  BillingPeriod,
} from "../../../../../app/models/subscription/StripePrice";

import BillingPeriodToggle from "@/components/marketing/toggles/BillingPeriodToggle.vue";
import { mapGetters } from "vuex";
@Component({
  components: {
    Plans,
    ErrorModal,
    SuccessModal,
    BillingPeriodToggle,
    LoadingButton,
  },
  computed: {
    ...mapGetters("tenant", {
      stripeCard: "defaultStripeCard",
      activePrice: "activePrice",
      activeProduct: "activeProduct",
    }),
    ...mapGetters("pricing", {
      selectedPrice: "selectedPrice",
      selectedProduct: "selectedProduct",
    }),
  },
})
export default class TenantSubscriptionPlan extends BaseComponent {
  private editing: boolean = false;
  private stripeCard!: Stripe.Card;
  private selectedPrice!: StripePrice;
  private activePrice!: StripePrice;
  updateSubscription() {
    if (!this.selectedPrice || !this.selectedPrice.stripeId) {
      // @ts-ignore
      this.$refs["error-modal"].show(
        this.$t("shared.select") + " " + this.$t("shared.product")
      );
      return;
    }
    if (
      // this.selectedPrice.trialDays === 0 &&
      // this.selectedPrice.price > 0 &&
      !this.stripeCard
    ) {
      // @ts-ignore
      this.$refs["error-modal"].show(this.$t("settings.tenant.payment.notset"));
      return;
    }

    // @ts-ignore
    this.$refs.loadingButton.start();
    this.services.stripe
      .updateSubscription(this.selectedPrice)
      .then((response) => {
        this.services.stripe.getCurrentCustomer();
        // @ts-ignore
        this.$refs["success-modal"].show(
          this.$t("settings.tenant.subscription.updated")
        );
        this.eventBus.$emit("updated-plan");
        this.editing = false;
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      })
      .finally(() => {
        // @ts-ignore
        this.$refs.loadingButton.stop();
      });
  }
  async openCustomerPortal() {
    this.services.stripe
      .createCustomerPortalSession()
      .then((result: any) => {
        location = result.data.url;
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  get myProducts(): StripePrice[] {
    return (this.$store.state.tenant.myProducts as StripePrice[]).filter(
      (f) => f.billingPeriod !== BillingPeriod.Once
    );
  }
  get saveText() {
    if (!this.selectedPrice) {
      return this.$t("shared.select") + " " + this.$t("shared.product");
    } else if (this.selectedPrice.billingPeriod === BillingPeriod.Once) {
      return this.$t("marketing.pricing.buy");
    } else if (!this.activePrice) {
      return this.$t("marketing.pricing.subscribe");
    }
    return this.$t("marketing.pricing.updateSubscription");
    // else if (this.activePrice.stripeId === this.selectedPrice.stripeId) {
    //   return "";
    // } else if (this.selectedPrice.price < this.activePrice.price) {
    //   return this.$t("marketing.pricing.downgrade");
    // } else {
    //   return this.$t("marketing.pricing.upgrade");
    // }
  }
  // get selectedPrice() {
  //   const selectedProduct = this.$store.state.pricing
  //     .selectedProduct as StripeProduct;
  //   return (
  //     selectedProduct.prices.find(
  //       (f) => f.billingPeriod === this.$store.state.pricing.billingPeriod
  //     ) ?? selectedProduct.prices[0]
  //   );
  // }
}
</script>
