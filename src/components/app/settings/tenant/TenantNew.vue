<template>
  <div>
    <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <section class="absolute inset-y-0 pl-16 max-w-full right-0 flex">
          <!--
        Slide-over panel, show/hide based on slide-over state.

        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0" 
          To: "translate-x-full"
          -->
          <div class="w-screen max-w-md">
            <div class="h-full divide-y divide-gray-200 flex flex-col bg-primary shadow-2xl">
              <div class="flex-1 h-0 overflow-y-auto bg-primary">
                <header class="space-y-1 py-6 px-4 bg-theme-700 sm:px-6">
                  <div class="flex items-center justify-between space-x-3">
                    <h2
                      class="text-lg leading-7 font-medium text-white"
                    >{{ $t("settings.tenant.create") }}</h2>
                    <div class="h-7 flex items-center">
                      <button
                        @click="close"
                        aria-label="Close panel"
                        class="text-theme-200 hover:text-white transition ease-in-out duration-150"
                      >
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <p
                      class="text-sm leading-5 text-theme-300"
                    >{{ $t("settings.tenant.createDescription") }}</p>
                  </div>
                </header>
                <div class="flex-1 flex flex-col justify-between">
                  <div class="px-4 divide-y divide-gray-200 sm:px-6">
                    <div class="space-y-6 pt-6 pb-5">
                      <div class="space-y-1">
                        <label
                          for="name"
                          class="block text-sm font-medium leading-5 text-primary"
                        >{{ $t("shared.name") }}</label>
                        <div class="relative rounded-md shadow-sm">
                          <input
                            v-model="name"
                            id="name"
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          />
                        </div>
                      </div>
                      <div>
                        <currency-toggle class="w-full flex justify-center"></currency-toggle>
                      </div>
                      <div class="space-y-1">
                        <plans ref="plans"></plans>
                      </div>
                    </div>

                    <div class="space-y-4 pt-4 pb-6 text-right">
                      <div class="text-sm leading-5 right-0">
                        <span class="inline-flex rounded-md shadow-sm">
                          <button
                            @click="close"
                            class="ml-1 h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-md text-gray-500 bg-primary hover:bg-secondary focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
                          >{{ $t("shared.cancel") }}</button>
                        </span>
                        <span class="inline-flex rounded-md shadow-sm ml-2">
                          <button
                            @click="createTenant"
                            class="ml-1 h-8 inline-flex items-center px-4 py-2 border border-theme-200 text-xs leading-5 font-medium rounded-md text-theme-700 bg-theme-100 hover:bg-theme-200 focus:outline-none focus:shadow-outline-indigo focus:border-theme-700 active:bg-theme-700 transition duration-150 ease-in-out"
                          >{{ $t("shared.create") }}</button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <modal ref="card-modal">
      <div>
        <card
          ref="card"
          class="stripe-card w-full mt-5 mb-5"
          :class="complete ? 'border-1 border-green-100' : ''"
          :stripe="stripeKey"
          :options="stripeOptions"
          @change="complete = $event.complete"
        />

        <button
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-theme-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-theme-800 focus:outline-none focus:bg-theme-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          @click="pay"
          :disabled="!complete"
        >{{ getButtonText }}</button>
      </div>
    </modal>
    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
    <confirm-modal ref="confirm-modal" v-on:yes="tryRegister"></confirm-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../components/shared/BaseComponent.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import Modal from "@/components/shared/modals/Modal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import Plans from "@/components/marketing/Plans.vue";
import { StripeProduct } from "../../../../app/models/subscription/StripeProduct";
import { Card, createToken } from "vue-stripe-elements-plus";
import { BillingPeriod } from "../../../../app/models/subscription/StripePrice";
import CurrencyToggle from "@/components/marketing/toggles/CurrencyToggle.vue";

@Component({
  components: {
    SuccessModal,
    ErrorModal,
    Modal,
    ConfirmModal,
    Plans,
    Card,
    CurrencyToggle,
  },
})
export default class TenantNew extends BaseComponent {
  private name: string = "";
  private stripeKey: string = "";
  private stripeOptions: any = {};
  private complete: boolean = false;
  created() {
    // @ts-ignore
    this.stripeKey = process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY.toString();
    this.stripeOptions = {
      showCardHolderName: true,
      hidePostalCode: false,
      iconStyle: "solid",
      elements: {
        locale: this.$i18n.locale,
      },
    };
    if (!this.selectedProduct) {
      this.$store.commit("pricing/select", {
        product: this.$store.state.pricing.products[0],
        billingPeriod: BillingPeriod.Monthly,
      });
    }
  }
  close() {
    this.$emit("close");
  }
  createTenant() {
    if (this.name !== "") {
      // @ts-ignore
      this.$refs["confirm-modal"].show(
        this.$t("settings.tenant.createConfirm")
      );
    }
  }
  tryRegister() {
    // if (this.selectedPrice?.trialDays === 0 && this.selectedPrice?.price > 0) {
    //   // @ts-ignore
    //   this.$refs["card-modal"].show(
    //     this.$t("account.register.providePaymentDetails"),
    //     this.$t("shared.cancel")
    //   );
    // } else {
    //   this.register();
    // }
    this.register();
  }
  pay() {
    createToken()
      .then((data) => {
        if (data.error) {
          // @ts-ignore
          this.$refs["error-modal"].show(data.error.message);
        } else {
          this.register(data.token.id);
        }
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      })
      .finally(() => {
        // @ts-ignore
        this.$refs["card-modal"].close();
      });
  }
  register(stripeCardToken: string = "") {
    if (!this.selectedPrice) {
      return;
    }
    this.services.tenants
      .create(this.name, this.selectedPrice, stripeCardToken)
      .then((response) => {
        // // @ts-ignore
        // this.$refs["success-modal"].show(this.$t("settings.tenant.created"));
        this.name = "";
        this.$router.go(0);
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  get selectedProduct() {
    return this.$store.state.pricing.selectedProduct as StripeProduct;
  }
  get getButtonText() {
    if (this.selectedPrice) {
      return (
        (this.selectedPrice.billingPeriod === BillingPeriod.Once
          ? this.$t("marketing.pricing.pay")
          : this.$t("marketing.pricing.subscribe")) +
        " " +
        this.priceDescription
      );
    }
  }
  get selectedPrice() {
    if (this.selectedProduct) {
      return (
        this.selectedProduct.prices.find(
          (f) => f.billingPeriod === this.$store.state.pricing.billingPeriod
        ) ?? this.selectedProduct.prices[0]
      );
    }
  }
  get billingPeriod() {
    if (this.selectedPrice) {
      if (this.selectedPrice?.billingPeriod === BillingPeriod.Once) {
        return this.$t("marketing.pricing.once");
      } else {
        return (
          "/ " +
          this.$t(
            "marketing.pricing." +
              BillingPeriod[this.selectedPrice.billingPeriod] +
              "Short"
          )
        );
      }
    }
  }
  get priceDescription() {
    return "$" + this.selectedPrice?.price + " " + this.billingPeriod;
  }
}
</script>
