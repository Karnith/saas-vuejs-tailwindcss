<template>
  <div>
    <div class="flex flex-col text-center w-full mb-6">
      <h1
        class="sm:text-4xl text-3xl font-medium title-font mb-2 text-secondary"
      >
        {{ $t("marketing.pricing.title") }}
      </h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
        {{ $t("marketing.pricing.headline") }}
      </p>
      <div class="w-full flex justify-center mt-2">
        <div v-if="billingPeriods.length > 1">
          <billing-period-toggle></billing-period-toggle>
        </div>
      </div>
      <currency-toggle
        class="w-full flex justify-center mt-2"
      ></currency-toggle>
    </div>
    <div
      v-if="!fromServer"
      class="bg-theme-100 mb-2 rounded-md border border-theme-300"
    >
      <div class="rounded-md bg-theme-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-theme-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div class="ml-3">
            <h3 class="text-sm leading-5 font-medium text-theme-800">
              {{ $t("shared.warning") }}
            </h3>
            <div class="mt-2 text-sm leading-5 text-theme-700">
              <p>
                {{ $t("admin.pricing.thesePricesAreFromFiles") }}
                {{ pricingFile }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap -m-2" v-if="products">
      <div
        v-if="products.length === 1"
        class="mt-8 bg-primary pb-16 sm:mt-12 sm:pb-20 lg:pb-28 w-full"
      >
        <div class="relative">
          <div class="absolute inset-0 h-1/2 bg-primary"></div>
          <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              class="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex"
            >
              <div class="bg-secondary px-6 py-8 lg:p-12 w-full">
                <h3
                  class="text-2xl leading-8 font-extrabold text-primary sm:text-3xl sm:leading-9"
                >
                  {{ products[0].title }}
                </h3>
                <p class="mt-6 text-base leading-6 text-gray-500">
                  {{ products[0].description }}
                </p>
                <div class="mt-8">
                  <div class="flex items-center">
                    <h4
                      class="flex-shrink-0 pr-4 bg-secondary text-sm leading-5 tracking-wider font-semibold uppercase text-theme-600"
                    >
                      What's included
                    </h4>
                    <div class="flex-1 border-t-2 border-gray-200"></div>
                  </div>
                  <ul class="mt-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                    <li
                      v-for="(feature, idx) in products[0].features"
                      :key="idx"
                      :class="
                        idx === 0
                          ? 'flex items-start lg:col-span-1'
                          : 'mt-5 flex items-start lg:col-span-1 lg:mt-0'
                      "
                    >
                      <span
                        v-if="feature.included"
                        class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-theme-500 text-white rounded-full flex-shrink-0"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2.5"
                          class="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      <span
                        v-else
                        class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-red-500 text-white rounded-full flex-shrink-0"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2.5"
                          class="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      <p class="ml-3 text-sm leading-5 primary">
                        {{
                          $t("marketing.pricing.features." + feature.key, [
                            feature.value,
                          ])
                        }}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12"
              >
                <div
                  class="mt-4 flex items-center justify-center text-5xl leading-none font-extrabold primary"
                >
                  <span>${{ getPrice(products[0]).price }}</span>
                  <span class="text-lg ml-1 font-normal text-gray-500">{{
                    billingPeriod(products[0])
                  }}</span>
                  <span
                    class="ml-3 text-xl leading-7 font-medium text-gray-500 uppercase"
                    >{{ getPrice(products[0]).currency }}</span
                  >
                </div>

                <div class="mt-6">
                  <div class="rounded-md shadow">
                    <a
                      href="#"
                      class="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-theme-700 hover:bg-theme-600 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                      <span v-if="getPrice(products[0]).trialDays > 0">
                        {{
                          $t("marketing.pricing.startTrial", [
                            getPrice(products[0]).trialDays,
                          ])
                        }}
                      </span>
                      <span v-else-if="billingPeriodOnce(products[0])">
                        {{ $t("marketing.pricing.payOnce") }}
                      </span>
                      <span v-else>
                        {{ $t("marketing.pricing.subscribe") }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        v-for="(product, index) in products"
        :key="index"
        :class="classForProduct(index)"
      >
        <div>
          <div v-if="productHasPrices(product) && getPrice(product)">
            <div>
              <router-link
                :to="{ path: '/account/register' }"
                v-if="!product.badge"
                @click.native="selectProduct(product)"
                class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col overflow-hidden hover:border-theme-300"
              >
                <div class="mb-3">
                  <h3 v-bind:class="product.class" id="product">
                    {{ product.title }}
                  </h3>
                </div>

                <h1
                  class="text-5xl text-secondary leading-none flex items-center pb-4 mb-4 border-b border-gray-200"
                >
                  <span>${{ getPrice(product).price }}</span>
                  <span
                    v-if="getPrice(product).priceBefore"
                    class="ml-1 line-through text-2xl leading-8 font-medium text-gray-500"
                    >${{ getPrice(product).priceBefore }}</span
                  >
                  <span class="text-lg ml-1 font-normal text-gray-500">{{
                    billingPeriod(product)
                  }}</span>
                </h1>
                <p
                  v-for="(feature, index) in product.features"
                  :key="index"
                  class="flex items-center text-gray-600 mb-2"
                >
                  <span
                    v-if="feature.included"
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-theme-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span
                    v-else
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-red-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  {{
                    $t("marketing.pricing.features." + feature.key, [
                      feature.value,
                    ])
                  }}
                </p>

                <router-link
                  @click.native="selectProduct(product)"
                  class="flex items-center mt-auto text-theme-100 bg-gradient-to-r from-theme-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-theme-800 rounded"
                  :to="{ path: '/account/register' }"
                >
                  <span v-if="getPrice(product).trialDays > 0">
                    {{
                      $t("marketing.pricing.startTrial", [
                        getPrice(product).trialDays,
                      ])
                    }}
                  </span>
                  <span v-else-if="billingPeriodOnce(product)">
                    {{ $t("marketing.pricing.payOnce") }}
                  </span>
                  <span v-else>{{ $t("marketing.pricing.subscribe") }}</span>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </router-link>
                <p class="text-xs text-gray-500 mt-3">
                  {{ $t("marketing.pricing.noCreditCardRequired") }}
                </p>
              </router-link>
              <router-link
                v-else
                :to="{ path: '/account/register' }"
                @click.native="selectProduct(product)"
                class="h-full p-6 rounded-lg border-2 border-theme-300 flex flex-col relative overflow-hidden"
              >
                <span
                  class="bg-theme-300 text-theme-700 px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl uppercase"
                  >{{ badgeFromProduct(product) }}</span
                >
                <div class="mb-3">
                  <h3 v-bind:class="product.class" id="product">
                    {{ product.title }}
                  </h3>
                </div>
                <h1
                  class="text-5xl text-secondary leading-none flex items-center pb-4 mb-4 border-b border-gray-200"
                >
                  <span>${{ getPrice(product).price }}</span>
                  <span
                    v-if="getPrice(product).priceBefore"
                    class="ml-1 line-through text-2xl leading-8 font-medium text-gray-500"
                    >${{ getPrice(product).priceBefore }}</span
                  >
                  <span class="text-lg ml-1 font-normal text-gray-500">{{
                    billingPeriod(product)
                  }}</span>
                </h1>
                <p
                  v-for="(feature, index) in product.features"
                  :key="index"
                  class="flex items-center text-gray-600 mb-2"
                >
                  <span
                    v-if="feature.included"
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-theme-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span
                    v-else
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-red-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  {{
                    $t("marketing.pricing.features." + feature.key, [
                      feature.value,
                    ])
                  }}
                </p>

                <router-link
                  @click.native="selectProduct(product)"
                  class="flex items-center mt-auto text-theme-100 bg-gradient-to-r from-theme-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-theme-400 rounded"
                  :to="{ path: '/account/register' }"
                >
                  <span v-if="getPrice(product).trialDays > 0">
                    {{
                      $t("marketing.pricing.startTrial", [
                        getPrice(product).trialDays,
                      ])
                    }}
                  </span>
                  <span v-else-if="billingPeriodOnce(product)">
                    {{ $t("marketing.pricing.payOnce") }}
                  </span>
                  <span v-else>{{ $t("marketing.pricing.subscribe") }}</span>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </router-link>
                <p class="text-xs text-gray-500 mt-3">
                  {{ $t("marketing.pricing.noCreditCardRequired") }}
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import { StripeProduct } from "../../../app/models/subscription/StripeProduct";
import BillingPeriodToggle from "@/components/marketing/toggles/BillingPeriodToggle.vue";
import CurrencyToggle from "@/components/marketing/toggles/CurrencyToggle.vue";
import Products from "@/components/marketing/pricing/Products.vue";
import {
  StripePrice,
  BillingPeriod,
} from "../../../app/models/subscription/StripePrice";

@Component({
  components: {
    BillingPeriodToggle,
    CurrencyToggle,
    Products,
  },
})
export default class ProductsComponent extends BaseComponent {
  private items = [] as StripeProduct[];
  private fromServer: boolean = true;

  mounted() {
    this.loading = true;
    this.reload(false);
  }
  async reload(fromServer: boolean) {
    const debug = process.env.NODE_ENV !== "production";

    this.fromServer = fromServer;
    this.items = [];
    this.loading = true;
    this.services.stripe
      .getProducts(fromServer, true)
      .then((response: any) => {
        this.items = [];
        response?.forEach((product) => {
          this.items.push(product);
        });
        if (response.length === 0 && this.fromServer && debug) {
          this.reload(false);
        }
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  classForProduct(index) {
    // If there are 3 products, the last one full width
    if (this.products.length === 3) {
      if (index === this.products.length - 1) {
        return "p-4 xl:w-1/3 md:w-1/1 w-full";
      }
    } else if (this.products.length === 2 || this.products.length === 4) {
      return "p-4 xl:w-1/2 md:w-1/1 w-full";
    }
    return "p-4 xl:w-1/3 md:w-1/2 w-full";
  }
  private billingPeriodOnce(product: StripeProduct): boolean | undefined {
    return this.getPrice(product)?.billingPeriod === BillingPeriod.Once;
  }
  private billingPeriod(product: StripeProduct): string {
    if (this.billingPeriodOnce(product)) {
      return this.$t("marketing.pricing.once").toString();
    } else {
      const idx = this.getPrice(product)?.billingPeriod ?? 0;
      return "/" + this.$t("marketing.pricing." + BillingPeriod[idx] + "Short");
    }
  }
  private selectProduct(product: any) {
    this.$store.commit("pricing/select", {
      product,
      billingPeriod: this.$store.state.pricing.billingPeriod,
    });
  }
  private getPrice(product: StripeProduct): StripePrice | undefined {
    const prices = product.prices.find(
      (f) =>
        (f.billingPeriod === this.$store.state.pricing.billingPeriod ||
          f.billingPeriod === BillingPeriod.Once) &&
        f.currency === this.$store.state.pricing.currency &&
        f.active
    );
    return prices;
  }
  private productHasPrices(product: StripeProduct): boolean {
    return product && product.prices && product.prices.length > 0;
  }
  private badgeFromProduct(product: StripeProduct): string {
    if (product.badge) {
      const translated = this.$t("marketing.pricing.badges." + product.badge);
      if (translated) {
        return translated.toString();
      } else {
        return product.badge;
      }
    }
    return "";
  }
  get products(): StripeProduct[] {
    return (this.$store.state.pricing.products as StripeProduct[])
      .filter((f) => this.getPrice(f) !== undefined && f.active)
      .sort((x, y) => {
        return x.tier > y.tier ? 1 : -1;
      });
  }
  get billingPeriods() {
    const periods = [];
    (this.$store.state.pricing.products as StripeProduct[]).map((f) =>
      f.prices.forEach((price) => {
        // @ts-ignore
        if (periods.includes(price.billingPeriod) === false) {
          // @ts-ignore
          periods.push(price.billingPeriod);
        }
      })
    );
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    return periods.filter(onlyUnique);
  }
  get pricingFile() {
    const debug = process.env.NODE_ENV !== "production";
    if (debug) {
      return "ClientApp/src/store/modules/pricing/default-pricing.Development.ts";
    } else {
      return "ClientApp/src/store/modules/pricing/default-pricing.ts";
    }
  }
}
</script>
