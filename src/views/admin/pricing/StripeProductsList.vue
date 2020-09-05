<template>
  <div>
    <object-list
      :title="$t('admin.pricing.title')"
      routeNew="products/new"
      v-on:reload="reload(true)"
      :allowDownload="false"
    >
      <template v-slot:extraButtons>
        <span class="hidden sm:block shadow-sm rounded-md mr-0">
          <router-link
            to="/pricing"
            target="_blank"
            class="h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-md text-gray-700 bg-theme-100 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >
            <i class="fa fa-eye -ml-1 mr-2 h-5 w-5 text-gray-500"></i>
            {{ $t("admin.pricing.goToPricingPage") }}
          </router-link>
        </span>
      </template>
      <template v-slot:table>
        <div v-if="loading">
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
        </div>
        <div v-else>
          <div v-if="!items || items.length === 0">
            <div>{{ $t("") }}</div>
          </div>
          <div v-else>
            <div>
              <div
                v-if="!fromServer"
                class="bg-yellow-100 mb-2 rounded-md border border-yellow-300"
              >
                <div class="rounded-md bg-yellow-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-5 w-5 text-yellow-400"
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
                      <h3 class="text-sm leading-5 font-medium text-yellow-800">
                        {{ $t("shared.warning") }}
                      </h3>
                      <div class="mt-2 text-sm leading-5 text-yellow-700">
                        <p>
                          {{ $t("admin.pricing.thesePricesAreFromFiles") }}
                          {{ pricingFile }}
                        </p>
                      </div>
                      <div class="text-sm leading-5 right-0 -ml-3 mt-2">
                        <span class="inline-flex rounded-md ml-2">
                          <button
                            @click="generateFromFiles"
                            class="ml-1 h-8 inline-flex items-center px-4 py-2 border border-orange-200 text-xs leading-5 font-medium rounded-md text-orange-700 bg-orange-200 hover:text-orange-500 focus:outline-none focus:shadow-outline-yellow focus:border-theme-700 active:bg-theme-700 transition duration-150 ease-in-out"
                          >
                            {{ $t("admin.pricing.generateFromFiles") }}
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-sm border-b border-gray-200"
              >
                <table class="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.stripeProduct.stripeId") }}
                      </th>
                      <th
                        class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.stripeProduct.tier") }}
                      </th>
                      <th
                        class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.stripeProduct.title") }}
                      </th>

                      <th
                        class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.stripeProduct.badge") }}
                      </th>
                      <th
                        class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.stripeProduct.active") }}
                      </th>
                      <th
                        class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.stripeProduct.maxUsers") }}
                      </th>
                      <th
                        class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.stripePrice.plural") }}
                      </th>
                      <th
                        class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.stripeFeature.plural") }}
                      </th>

                      <th class="pr-5 py-2 bg-gray-200 w-10"></th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in orderedItems" :key="index">
                      <td
                        class="truncate px-6 py-4 text-sm leading-3 font-medium text-theme-700 hover:text-theme-600"
                      >
                        <router-link
                          v-if="item.uuid"
                          :to="'product/' + item.uuid"
                          >{{ item.stripeId }}</router-link
                        >
                      </td>
                      <td
                        class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                      >
                        {{ item.tier }}
                      </td>
                      <td
                        class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                      >
                        {{ item.title }}
                      </td>
                      <td
                        class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                      >
                        {{ item.badge }}
                      </td>
                      <td
                        class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                      >
                        <span
                          class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium leading-1"
                          :class="
                            item.active
                              ? 'bg-teal-100 text-teal-800 border border-teal-200'
                              : 'bg-red-100 text-red-800 border border-red-200'
                          "
                          >{{ item.active ? "Active" : "Inactive" }}</span
                        >
                      </td>
                      <td
                        class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                      >
                        {{
                          !item.maxUsers || item.maxUsers === 0
                            ? $t("shared.unlimited")
                            : item.maxUsers
                        }}
                      </td>
                      <td
                        class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                      >
                        <router-link
                          v-if="fromServer"
                          :to="'product/' + item.uuid + '/prices'"
                          class="text-theme-500 hover:text-theme-300"
                          >{{ item.prices.length }}</router-link
                        >
                        <div v-else>{{ item.prices.length }}</div>
                      </td>
                      <td
                        class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                      >
                        <router-link
                          v-if="fromServer"
                          :to="'product/' + item.uuid + '/features'"
                          class="text-theme-500 hover:text-theme-300"
                          >{{ item.features.length }}</router-link
                        >
                        <div v-else>{{ item.features.length }}</div>
                      </td>
                      <td
                        class="pr-5 py-4 whitespace-no-wrap text-right text-sm leading-3 font-medium"
                      >
                        <router-link
                          v-if="fromServer"
                          :to="{
                            path: 'product/' + item.uuid + '/edit',
                          }"
                          class="text-theme-600 hover:text-theme-900"
                          >{{ $t("shared.edit") }}</router-link
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </template>
    </object-list>

    <div class="bg-theme-100 mb-2 rounded-md border border-theme-300 mt-8">
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
              {{ $t("netcoresaas.backendNeeded") }}
            </h3>
            <div class="mt-2 text-sm leading-5 text-theme-700">
              <p>{{ $t("netcoresaas.fakeData") }}</p>
            </div>
            <div class="text-sm leading-5 right-0 -ml-3 mt-2">
              <span class="inline-flex rounded-md ml-2">
                <a
                  href="https://netcoresaas.com/product"
                  target="_blank"
                  class="flex items-center justify-center px-4 py-2 border border-transparent text-sm bg-theme-200 leading-5 font-medium rounded-md text-theme-800 bg-white hover:text-theme-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                  >{{ $t("netcoresaas.getBackend") }}</a
                >
              </span>
              <span class="inline-flex rounded-md ml-2">
                <a
                  href="https://demo.netcoresaas.com"
                  target="_blank"
                  class="flex items-center justify-center px-4 py-2 border border-transparent text-sm bg-theme-200 leading-5 font-medium rounded-md text-theme-800 bg-white hover:text-theme-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                  >{{ $t("netcoresaas.demo") }}</a
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <error-modal ref="error-modal"></error-modal>
    <!-- <modal ref="pricing-modal">
      <products></products>
    </modal>-->
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import ObjectList from "../../../components/shared/forms/ObjectList.vue";
import { report } from "process";
import TableRowSkeleton from "@/components/shared/skeletons/TableRowSkeleton.vue";
import { StripeProduct } from "../../../app/models/subscription/StripeProduct";
import Modal from "../../../components/shared/modals/Modal.vue";
import Products from "../../../components/marketing/pricing/Products.vue";

@Component({
  components: { Products, ObjectList, TableRowSkeleton, Modal },
})
export default class StripeProductComponent extends BaseComponent {
  private items = [] as StripeProduct[];
  private fromServer: boolean = true;
  created() {
    const self = this;
    // this.eventBus.$on("stripeProduct-canceled", () => self.canceled());
    this.eventBus.$on("stripeProduct-added", (data) => self.added(data));
    this.eventBus.$on("stripeProduct-saved", (data) => self.saved(data));
    this.eventBus.$on("stripeProduct-deleted", (data) => self.deleted(data));
  }

  mounted() {
    this.reload(false);
  }
  async reload(fromServer: boolean) {
    this.fromServer = fromServer;
    this.items = [];
    this.loading = true;
    this.services.stripe
      .getProducts(fromServer, false)
      .then((response: any) => {
        this.items = [];
        response?.forEach((product) => {
          this.items.push(product);
        });
        // if (response.length === 0 && this.fromServer) {
        //   this.reload(false);
        // }
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  deleted(data: StripeProduct) {
    this.items = this.items.filter((f) => f.id !== data.id);
  }
  added(data: StripeProduct) {
    this.items.push(data);
  }
  saved(data: StripeProduct) {
    const idx = this.items.findIndex((f) => f.id === data.id);
    this.items[idx] = data;
  }
  async generateFromFiles() {
    // @ts-ignore
    this.$refs["error-modal"].show("Backend needed");
    await this.items.forEach((product) => {
      this.services.stripeAdmin
        .syncProduct(true, product)
        .then((response) => {
          this.reload(true);
        })
        .catch((error) => {
          // @ts-ignore
          this.$refs["error-modal"].show(error);
        });
    });
  }
  get pricingFile() {
    const debug = process.env.NODE_ENV !== "production";
    if (debug) {
      return "ClientApp/src/store/modules/pricing/default-pricing.Development.ts";
    } else {
      return "ClientApp/src/store/modules/pricing/default-pricing.ts";
    }
  }
  get orderedItems() {
    if (!this.items) {
      return [];
    }
    return this.items.sort((x, y) => {
      return x?.tier > y?.tier ? 1 : -1;
    });
  }
}
</script>
