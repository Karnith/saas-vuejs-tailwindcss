<template>
  <div class>
    <div class="space-y-1" v-click-outside="closeDropdown">
      <span id="listbox-label" class="block text-sm leading-5 font-medium">
        {{ $t("shared.product") }}
        <span class="inline float-right -mt-2">
          <!-- <Billing-Period-Toggle></Billing-Period-Toggle> -->
        </span>
      </span>

      <div class="relative">
        <span class="inline-block w-full rounded-md shadow-sm">
          <button
            v-on:click="droppedDown = !droppedDown"
            type="button"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            class="text-gray-800 cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            <span v-if="selectedPrice" class="block truncate">
              {{ selectedProductName }} - ${{
              selectedPrice ? selectedPrice.price : ""
              }}
              <span
                class="uppercase"
              >{{ selectedPrice.currency }}</span>
              {{
              selectedBillingPeriod !== "once"
              ? "/ " + $t("marketing.pricing." + selectedBillingPeriod)
              : $t("marketing.pricing." + selectedBillingPeriod)
              }}
            </span>
            <span v-else class="block truncate">{{ $t("shared.select") }}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </span>
        <!-- Select popover, show/hide based on select state. -->
        <div
          v-if="droppedDown"
          class="flow-root z-30 absolute mt-1 w-full rounded-md bg-white shadow-lg"
        >
          <ul
            tabindex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            class="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
          >
            <!--
                        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                        Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
            -->
            <div v-for="(product, index) in products" :key="index">
              <li
                v-for="(currentPrice, idx2) in prices(product)"
                :key="idx2"
                id="listbox-option-0"
                role="option"
                class="text-gray-800 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-theme-100"
              >
                <a v-on:click="changeProduct(product, currentPrice)">
                  <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                  <span class="font-normal block truncate">
                    {{ product.title }}&nbsp;&nbsp;-&nbsp;&nbsp; ${{
                    currentPrice.price
                    }}
                    <span
                      class="uppercase"
                    >{{ currentPrice.currency }}</span>
                    {{ billingPeriod(currentPrice) }}
                  </span>

                  <!--
                          Checkmark, only display for selected option.

                          Highlighted: "text-white", Not Highlighted: "text-indigo-600"
                  -->
                  <span
                    v-if="isSelected(product, currentPrice)"
                    class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4"
                  >
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </a>
              </li>
            </div>
            <!-- More options... -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import { StripeProduct } from "../../app/models/subscription/StripeProduct";
import Stripe from "stripe";
import { Emit } from "vue-property-decorator";
import BillingPeriodToggle from "../../components/marketing/toggles/BillingPeriodToggle.vue";
import { mapGetters } from "vuex";
import {
  StripePrice,
  BillingPeriod,
} from "../../app/models/subscription/StripePrice";

@Component({
  components: { BillingPeriodToggle },
  computed: {
    ...mapGetters("pricing", {
      selectedProductName: "selectedProductName",
      selectedPrice: "selectedPrice",
      selectedBillingPeriod: "selectedBillingPeriod",
    }),
  },
})
export default class PlansComponent extends BaseComponent {
  public droppedDown: boolean = false;
  created() {
    if (this.$store.state.pricing.products.length === 0) {
      this.services.stripe.getProducts(false, true);
    }
  }
  // mounted() {
  //   this.setFromCurrentSubscription();
  // }
  // public setFromCurrentSubscription() {
  //   if (this.subscription) {
  //   }
  // }
  private changeProduct(product, currentPrice) {
    this.closeDropdown();
    this.$store.commit("pricing/select", {
      product,
      billingPeriod: currentPrice.billingPeriod,
    });
  }
  private closeDropdown() {
    this.droppedDown = false;
  }
  private price(product: StripeProduct) {
    return (
      product.prices.find(
        (f) => f.billingPeriod === this.$store.state.pricing.billingPeriod
      ) ?? product.prices[0]
    );
  }
  private billingPeriod(price: StripePrice) {
    if (price.billingPeriod === BillingPeriod.Once) {
      return this.$t("marketing.pricing.once");
    } else {
      return (
        "/ " +
        this.$t(
          "marketing.pricing." + BillingPeriod[price.billingPeriod] + "Short"
        )
      );
    }
  }
  private isSelected(product: StripeProduct, currentPrice: StripePrice) {
    if (this.selectedProduct?.title === product.title) {
      if (
        currentPrice.billingPeriod === BillingPeriod.Once ||
        (this.$store.state.pricing.billingPeriod ===
          currentPrice.billingPeriod &&
          currentPrice.currency === this.$store.state.pricing.currency)
      ) {
        return true;
      }
    }
    return false;
  }
  private prices(product: StripeProduct) {
    return product.prices.filter(
      (f) => f.currency === this.$store.state.pricing.currency && f.active
    );
  }
  get products() {
    return (this.$store.state.pricing.products as StripeProduct[])
      ?.filter((f) => f.active)
      .sort((x, y) => {
        return x.tier > y.tier ? 1 : -1;
      });
  }
  get subscription() {
    return this.$store.state.tenant.stripeSubscription as Stripe.Subscription;
  }
  get selectedProduct(): StripeProduct | undefined {
    return this.$store.state.pricing.selectedProduct as StripeProduct;
  }
}
</script>
