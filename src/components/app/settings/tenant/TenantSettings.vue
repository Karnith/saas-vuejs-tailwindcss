<template>
  <div>
    <div class="md:grid lg:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3
            class="text-lg font-medium leading-6 text-gray-900"
          >{{ $t("settings.tenant.general") }}</h3>
          <p class="mt-1 text-sm leading-5 text-gray-600"></p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="updateTenant()" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="name"
                    class="block text-sm font-medium leading-5 text-gray-700"
                  >{{ $t("shared.name") }}</label>
                  <input
                    v-model="tenant.name"
                    required
                    id="name"
                    class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="subdomain"
                    class="block text-sm font-medium leading-5 text-gray-700"
                  >{{ $t("settings.tenant.subdomain") }}</label>
                  <input
                    v-model="tenant.subdomain"
                    required
                    id="subdomain"
                    class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div class="col-span-6 sm:col-span-3 text-left">
                  <label
                    for="appTheme"
                    class="block text-sm font-medium leading-5 text-gray-700"
                  >{{ $t("shared.theme") }}</label>
                  <div class="px-2 border border-gray-300 rounded-md shadow-sm">
                    <select
                      v-model="tenant.appTheme"
                      @change="
                        $store.commit('theme/appTheme', $event.target.value)
                      "
                      required
                      id="appTheme"
                      class="w-full py-2 focus:outline-none text-gray-700 focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    >
                      <option
                        v-for="(appTheme, idx) in appThemes"
                        :key="idx"
                        :value="appTheme.theme"
                        :selected="tenant.appTheme === appTheme.theme"
                      >{{ appTheme.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="appColor"
                    class="block text-sm font-medium leading-5 text-gray-700"
                  >Color</label>
                  <div class="px-2 border border-gray-300 rounded-md shadow-sm">
                    <select
                      v-model="tenant.appColor"
                      @change="
                        $store.commit('theme/appColor', $event.target.value)
                      "
                      required
                      id="appColor"
                      class="w-full py-2 focus:outline-none text-gray-700 focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    >
                      <option
                        v-for="(appColor, idx) in appColors"
                        :key="idx"
                        :value="appColor.theme"
                        :selected="tenant.appColor === appColor.theme"
                      >{{ appColor.name }}</option>
                    </select>
                  </div>
                </div>

                <div class="col-span-6 sm:col-span-6">
                  <label
                    for="photo"
                    class="block text-sm leading-5 font-medium text-gray-700"
                  >{{ $t("shared.icon") }}</label>
                  <div class="mt-2 flex items-center">
                    <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <img v-if="tenantIcon" :src="tenantIcon" />
                      <svg
                        v-else
                        class="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </span>
                    <span class="ml-5 rounded-md shadow-sm">
                      <button
                        @click="uploadImage('icon')"
                        type="button"
                        class="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                      >{{ $t("shared.upload") }}</button>
                    </span>
                    <span v-if="tenantIcon" class="ml-2 rounded-md shadow-sm">
                      <button
                        @click="deleteImage('icon')"
                        type="button"
                        class="py-2 px-3 border bg-red-100 border-gray-300 rounded-md text-sm leading-4 font-medium text-red-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                      >{{ $t("shared.delete") }}</button>
                    </span>
                  </div>
                </div>

                <div class="col-span-2 sm:col-span-4">
                  <label
                    for="photo"
                    class="block text-sm leading-5 font-medium text-gray-700"
                  >{{ $t("shared.logo") }}</label>
                  <div v-if="tenantLogo" class="mt-2 flex items-center">
                    <span
                      class="h-auto w-30 overflow-hidden bg-gray-100 border border-gray-300 p-5 rounded-md shadow-md"
                    >
                      <img :src="tenantLogo" />
                    </span>
                  </div>
                  <span class="mt-2 rounded-md shadow-sm">
                    <button
                      @click="uploadImage('logo')"
                      type="button"
                      class="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    >{{ $t("shared.upload") }}</button>
                  </span>
                  <span v-if="tenantLogo" class="ml-2 rounded-md shadow-sm">
                    <button
                      @click="deleteImage('logo')"
                      type="button"
                      class="mt-2 py-2 px-3 border bg-red-100 border-gray-300 rounded-md text-sm leading-4 font-medium text-red-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    >{{ $t("shared.delete") }}</button>
                  </span>
                </div>

                <div class="col-span-2 sm:col-span-4">
                  <label
                    for="photo"
                    class="block text-sm leading-5 font-medium text-gray-700"
                  >{{ $t("shared.logoDarkmode") }}</label>
                  <div v-if="tenantLogoDarkmode" class="mt-2 flex items-center">
                    <span
                      class="h-auto w-30 overflow-hidden bg-gray-800 border border-gray-300 p-5 rounded-md shadow-md"
                    >
                      <img :src="tenantLogoDarkmode" />
                    </span>
                  </div>
                  <span class="mt-2 rounded-md shadow-sm">
                    <button
                      @click="uploadImage('logoDarkmode')"
                      type="button"
                      class="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    >{{ $t("shared.upload") }}</button>
                  </span>
                  <span v-if="tenantLogoDarkmode" class="ml-2 rounded-md shadow-sm">
                    <button
                      @click="deleteImage('logoDarkmode')"
                      type="button"
                      class="mt-2 py-2 px-3 border bg-red-100 border-gray-300 rounded-md text-sm leading-4 font-medium text-red-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    >{{ $t("shared.delete") }}</button>
                  </span>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-theme-600 shadow-sm hover:bg-theme-500 focus:outline-none focus:shadow-outline-blue active:bg-theme-600 transition duration-150 ease-in-out"
              >{{ $t("shared.save") }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <upload-image
      v-if="showUploadImage"
      v-on:close="showUploadImage = false"
      :title="$t('shared.' + imageType)"
      :image="imageCurrent"
      v-on:loaded="loadedImage"
    ></upload-image>
    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import UploadImage from "@/components/shared/forms/UploadImage.vue";
import Toggle from "@/components/shared/forms/Toggle.vue";
import { ITenantDTO } from "../../../../app/models/system/account/ITenantDTO";
import { appThemes, appColors } from "../../../../store/modules/theme/themes";
import { Console } from "console";
import { defaultState } from "../../../../store/modules/theme";

@Component({
  components: { SuccessModal, ErrorModal, UploadImage, Toggle },
})
export default class TenantSettingsComponent extends BaseComponent {
  imageType: string = "";
  imageCurrent: string = "";
  tenant = {} as ITenantDTO;
  showUploadImage = false;
  appThemes = appThemes;
  appColors = appColors;
  created() {
    this.getCurrentTenantInForm();
  }
  getCurrentTenantInForm() {
    this.tenant.name = this.$store.state.tenant.current.name;
    this.tenant.subdomain = this.$store.state.tenant.current.subdomain;
    this.tenant.domain = this.$store.state.tenant.current.domain;
    this.tenant.appTheme =
      this.$store.state.tenant.appTheme ?? defaultState.appTheme;
    this.tenant.appColor =
      this.$store.state.tenant.appColor ?? defaultState.appColor;
  }
  updateTenant() {
    this.services.tenants
      .update(this.tenant)
      .then((response) => {
        this.services.tenants.getMyTenants().then(() => {
          this.getCurrentTenantInForm();
        });
        // @ts-ignore
        this.$refs["success-modal"].show(this.$t("settings.tenant.updated"));
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  uploadImage(type) {
    this.imageType = type;
    if (type === "icon") {
      this.imageCurrent = this.tenantIcon;
    } else if (type === "logo") {
      this.imageCurrent = this.tenantLogo;
    } else if (type === "logoDarkmode") {
      this.imageCurrent = this.tenantLogoDarkmode;
    }
    this.showUploadImage = true;
  }
  deleteImage(type) {
    this.imageType = type;
    this.loadedImage(null);
  }
  loadedImage(image) {
    const payload: any = {};
    if (this.imageType === "logo") {
      payload.logo = image;
    } else if (this.imageType === "icon") {
      payload.icon = image;
    } else if (this.imageType === "logoDarkmode") {
      payload.logoDarkmode = image;
    }
    this.services.tenants
      // @ts-ignore
      .uploadImage(payload, this.imageType)
      .then((response) => {
        this.$store.commit("tenant/currentImage", {
          imageType: this.imageType,
          image,
        });
        this.showUploadImage = false;
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  }
  get tenantIcon() {
    return this.$store.state.tenant.current.icon;
  }
  get tenantLogo() {
    return this.$store.state.tenant.current.logo;
  }
  get tenantLogoDarkmode() {
    return this.$store.state.tenant.current.logoDarkmode;
  }
}
</script>
