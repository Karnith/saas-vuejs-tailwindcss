<template>
  <div>
    <div>
      <div
        class="flex items-center justify-between bg-white -m-4 sm:-m-8 p-8 pb-4 shadow-lg mb-4"
      >
        <div class="flex-1 min-w-0">
          <h2
            class="flex text-2xl font-bold text-gray-800 sm:text-3xl leading-9 sm:truncate"
          >
            {{ $t("models.tenant.plural") }}
          </h2>
        </div>
        <div class="mt-0 flex lg:mt-0 lg:ml-4">
          <span class="hidden sm:block ml-3 shadow-sm rounded-md">
            <button
              @click="reload"
              type="button"
              class="h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
            >
              <i class="fa fa-redo -ml-1 mr-2 h-5 w-5 text-gray-500"></i>
              {{ $t("shared.reload") }}
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="flex flex-col  mt-4 sm:mt-12">
      <div
        class="shadow overflow-scroll border-b border-gray-200 sm:rounded-lg"
      >
        <div v-if="loading">
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
        </div>
        <table v-else class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.name") }}
              </th>
              <!-- <th
                class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >{{ $t("models.tenant.domain") }}</th>
              <th
                class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >{{ $t("models.tenant.subdomain") }}</th>-->
              <th
                class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.icon") }}
              </th>
              <th
                class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.logo") }}
              </th>
              <th
                class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.logoDarkmode") }}
              </th>
              <th
                class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.appTheme") }}
              </th>
              <th
                class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.appColor") }}
              </th>

              <th
                class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.user.plural") }}
              </th>

              <th
                class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.stripe") }}
              </th>

              <th
                class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <!-- <th
                class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >{{ $t("shared.status") }}</th>-->
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in orderedItems" :key="index">
              <!-- <td
                @click.prevent="changeTenant(item)"
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-theme-800 hover:text-theme-700 cursor-pointer"
              >{{ item.name }}</td>-->

              <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >
                {{ item.name }}
              </td>
              <!-- <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >{{ item.domain }}</td>
              <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >{{ item.subdomain }}</td>-->
              <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >
                <img
                  v-if="item.icon"
                  class="h-8 w-8 rounded-md"
                  :src="item.icon"
                  @click="selectImage(item.icon, false)"
                />
                <span
                  v-else
                  class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500 shadow-xl"
                >
                  <span class="text-sm font-medium leading-none text-white">{{
                    "?"
                  }}</span>
                </span>
              </td>
              <td
                class="truncate px-6 py-4 text-lg leading-3 font-medium text-gray-900"
              >
                <img
                  v-if="item.logo"
                  class="h-auto rounded-md"
                  :src="item.logo"
                  @click="selectImage(item.logo, false)"
                />
                <span
                  v-else
                  class="inline-flex items-center justify-center h-8 w-20"
                >
                  <span
                    class="text-sm font-medium leading-none text-gray-800"
                  ></span>
                </span>
              </td>
              <td
                class="truncate px-6 py-4 text-lg leading-3 font-medium text-gray-900 bg-gray-800"
              >
                <img
                  v-if="item.logoDarkmode"
                  class="h-auto rounded-md"
                  :src="item.logoDarkmode"
                  @click="selectImage(item.logoDarkmode, true)"
                />
                <span
                  v-else
                  class="inline-flex items-center justify-centerh-8 w-20"
                >
                  <span
                    class="text-sm font-medium leading-none text-white"
                  ></span>
                </span>
              </td>
              <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >
                <span
                  class="inline-flex items-center justify-center h-8 w-8 rounded-full shadow-xl"
                  :class="appTheme(item)"
                >
                  <span
                    class="text-sm font-medium leading-none text-white"
                  ></span>
                </span>
              </td>
              <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >
                <span
                  class="inline-flex items-center justify-center h-8 w-8 rounded-full shadow-xl"
                  :class="appColor(item)"
                >
                  <span
                    class="text-sm font-medium leading-none text-white"
                  ></span>
                </span>
              </td>

              <td
                class="pr-5 py-4 whitespace-no-wrap text-right text-sm leading-3 font-medium"
              >
                <router-link
                  :to="{
                    path: '/admin/users/' + item.name + '/' + item.apiKey,
                  }"
                  class="text-theme-600 hover:text-theme-900"
                  >{{ $t("models.user.plural") }}</router-link
                >
              </td>
              <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >
                <button
                  :disabled="!item.stripeCustomerId"
                  @click="window.open(customerLink(item))"
                  class="cursor-pointer text-theme-600 hover:text-theme-500 disabled:opacity-75 disabled:cursor-not-allowed disabled:text-gray-500"
                >
                  {{ $t("models.tenant.stripeCustomerId") }}</button
                >,
                <button
                  :disabled="!item.stripeSubscriptionId"
                  @click="window.open(subscriptionOrProductLink(item))"
                  class="cursor-pointer text-theme-600 hover:text-theme-500 ml-2 disabled:opacity-75 disabled:cursor-default"
                >
                  {{ $t("models.tenant.stripeSubscriptionId") }}
                </button>
              </td>
              <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >
                {{ item.apiKey }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <modal ref="image-modal" class="bg-primary">
      <div
        class="rounded-lg pb-4 pt-4"
        :class="selectedImageIsDarkMode ? 'bg-gray-800' : 'bg-gray-100'"
      >
        <img :src="selectedImage" class="w-64 h-auto mx-auto" />
      </div>
    </modal>

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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import { ITenantDTO } from "../../app/models/system/account/ITenantDTO";
import TenantMembers from "@/components/app/settings/tenant/TenantMembers.vue";
import Modal from "@/components/shared/modals/Modal.vue";
import TableRowSkeleton from "@/components/shared/skeletons/TableRowSkeleton.vue";

@Component({ components: { TenantMembers, Modal, TableRowSkeleton } })
export default class TenantsComponent extends BaseComponent {
  private tenants?: ITenantDTO[] = [];
  private selectedImage: string = "";
  private selectedImageIsDarkMode: boolean = false;
  mounted() {
    this.reload();
  }
  async reload() {
    this.loading = true;
    this.tenants = [];
    this.services.admin
      .getTenants()
      .then((response: any) => {
        this.tenants = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  selectTenant(tenant: ITenantDTO) {
    this.$router.push("/admin/users/" + tenant.apiKey);
  }
  changeTenant(tenant: ITenantDTO) {
    this.services.tenants.changeDefault(tenant.apiKey).then((response: any) => {
      this.$store.commit("tenant/current", response.data.currentTenant);
      this.$router.push("/app");
    });
  }
  selectImage(image, isDarkmode) {
    this.selectedImage = image;
    this.selectedImageIsDarkMode = isDarkmode;
    // @ts-ignore
    this.$refs["image-modal"].show();
  }
  appTheme(tenant: ITenantDTO) {
    let theme: string = process.env.VUE_APP_THEME?.toString() || "";
    if (tenant.appTheme) {
      theme = tenant.appTheme;
    }
    return theme === "theme-bg-dark" ? "bg-gray-800" : "bg-gray-100";
  }
  appColor(tenant: ITenantDTO) {
    let color: string = process?.env?.VUE_APP_COLOR?.toString() || "";
    if (tenant.appColor) {
      color = tenant.appColor;
    }
    const current = color?.replace("theme", "");
    return "bg" + current + "-500";
  }
  avatarText(tenant: ITenantDTO) {
    if (tenant) {
      return tenant.name.substring(0, 2).toUpperCase();
    }
    return "";
  }
  stripeUrl() {
    return process.env.NODE_ENV === "production"
      ? "https://dashboard.stripe.com"
      : "https://dashboard.stripe.com/test";
  }
  customerLink(tenant: ITenantDTO) {
    return this.stripeUrl() + "/customers/" + tenant.stripeCustomerId;
  }
  subscriptionOrProductLink(tenant: ITenantDTO) {
    if (
      tenant.stripeSubscriptionId &&
      tenant.stripeSubscriptionId.includes("sub_")
    ) {
      return this.stripeUrl() + "/subscriptions/" + tenant.stripeSubscriptionId;
    } else {
      return this.stripeUrl() + "/payments/" + tenant.stripeSubscriptionId;
    }
  }
  get orderedItems() {
    if (!this.tenants) {
      return [];
    }
    return this.tenants.sort((x, y) => {
      return x.name > y.name ? -1 : 1;
    });
  }
}
</script>
