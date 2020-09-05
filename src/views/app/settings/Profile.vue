<template>
  <div>
    <div class>
      <!-- Profile -->
      <div class="md:grid lg:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3
              class="text-lg font-medium leading-6 text-gray-900"
            >{{ $t("settings.profile.profileTitle") }}</h3>
            <p class="mt-1 text-sm leading-5 text-gray-600">{{ $t("settings.profile.profileText") }}</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form @submit.prevent="updateProfile()">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-6 md:col-span-6">
                    <label
                      for="email_address"
                      class="block text-sm font-medium leading-5 text-gray-700"
                    >{{ $t("account.shared.email") }}</label>
                    <input
                      v-model="profile.email"
                      required
                      :disabled="true"
                      type="email"
                      id="email_address"
                      class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                  <div class="col-span-6 md:col-span-3">
                    <label
                      for="firstName"
                      class="block text-sm font-medium leading-5 text-gray-700"
                    >{{ $t("settings.profile.firstName") }}</label>
                    <input
                      id="firstName"
                      required
                      v-model="profile.firstName"
                      class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>

                  <div class="col-span-6 md:col-span-3">
                    <label
                      for="lastName"
                      class="block text-sm font-medium leading-5 text-gray-700"
                    >{{ $t("settings.profile.lastName") }}</label>
                    <input
                      required
                      v-model="profile.lastName"
                      id="lastName"
                      class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                  <div class="col-span-6 md:col-span-3">
                    <label
                      for="phone"
                      class="block text-sm font-medium leading-5 text-gray-700"
                    >{{ $t("settings.profile.phone") }}</label>
                    <input
                      v-model="profile.phone"
                      id="phone"
                      class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-6">
                    <label
                      for="photo"
                      class="block text-sm leading-5 font-medium text-gray-700"
                    >{{ $t("shared.avatar") }}</label>
                    <div class="mt-2 flex items-center">
                      <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <img v-if="avatar" :src="avatar" />
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
                          @click="showUploadImage = true"
                          type="button"
                          class="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                        >{{ $t("shared.upload") }}</button>
                      </span>
                      <span v-if="avatar" class="ml-2 rounded-md shadow-sm">
                        <button
                          @click="loadedImage(null)"
                          type="button"
                          class="py-2 px-3 border bg-red-100 border-gray-300 rounded-md text-sm leading-4 font-medium text-red-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                        >{{ $t("shared.delete") }}</button>
                      </span>
                    </div>
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

      <!-- Separator -->
      <div class="block">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>

      <!-- Security -->
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3
              class="text-lg font-medium leading-6 text-gray-900"
            >{{ $t("settings.profile.securityTitle") }}</h3>
            <p class="mt-1 text-sm leading-5 text-gray-600">
              {{ $t("settings.profile.securityText") }}.
              {{ $t("account.login.forgot") }}
              <a
                @click="logout"
                class="text-theme-600 font-bold hover:text-theme-500"
                :href="'/account/forgot?e=' + $store.state.account.user.email"
              >{{ $t("account.reset.button") }}</a>
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form @submit.prevent="updatePassword()">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div v-if="canChangePassword()">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-6">
                      <label
                        for="passwordCurrent"
                        class="block text-sm font-medium leading-5 text-gray-700"
                      >{{ $t("settings.profile.passwordCurrent") }}</label>
                      <input
                        :required="profile.loginType == 'Password'"
                        type="password"
                        id="passwordCurrent"
                        v-model="profile.passwordCurrent"
                        class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                    <div class="col-span-6 md:col-span-3">
                      <label
                        for="password"
                        class="block text-sm font-medium leading-5 text-gray-700"
                      >{{ $t("settings.profile.password") }}</label>
                      <input
                        required
                        type="password"
                        id="password"
                        v-model="profile.passwordNew"
                        class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div class="col-span-6 md:col-span-3">
                      <label
                        for="passwordConfirm"
                        class="block text-sm font-medium leading-5 text-gray-700"
                      >{{ $t("settings.profile.passwordConfirm") }}</label>
                      <input
                        required
                        type="password"
                        v-model="profile.passwordConfirm"
                        id="passwordConfirm"
                        class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
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
              <div
                v-else
                class="px-4 py-5 bg-white sm:p-6 block text-sm font-medium leading-5 text-gray-700"
              >{{ $t("settings.profile.cannotChangePassword") }}</div>
            </div>
          </form>
        </div>
      </div>

      <!-- Separator -->
      <div class="block">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>

      <!-- Preferences -->
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3
              class="text-lg font-medium leading-6 text-gray-900"
            >{{ $t("settings.preferences.title") }}</h3>
            <p
              class="mt-1 text-sm leading-5 text-gray-600"
            >{{ $t("settings.preferences.description") }}</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form @submit.prevent>
            <div class="shadow sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-6">
                    <label
                      for="passwordCurrent"
                      class="block text-sm font-medium leading-5 text-gray-700"
                    >{{ $t("settings.preferences.language") }}</label>
                    <selector
                      :selected="selectedLocale"
                      :options="locales"
                      v-on:selected="changedLocale"
                      translatePath="shared.locales"
                    ></selector>
                  </div>
                </div>
              </div>
              <!-- <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  class="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-theme-600 shadow-sm hover:bg-theme-500 focus:outline-none focus:shadow-outline-blue active:bg-theme-600 transition duration-150 ease-in-out"
                >{{ $t("shared.save") }}</button>
              </div>-->
            </div>
          </form>
        </div>
      </div>
    </div>
    <upload-image
      v-if="showUploadImage"
      v-on:close="showUploadImage = false"
      :title="$t('shared.avatar')"
      :image="avatar"
      v-on:loaded="loadedImage"
    ></upload-image>
    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import Selector from "@/components/shared/forms/Selector.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import supportedLocales from "../../../locale/supportedLocales";
import UploadImage from "@/components/shared/forms/UploadImage.vue";
import {
  IUserDTO,
  LoginType,
} from "../../../app/models/system/account/IUserDTO";

@Component({
  components: { Selector, SuccessModal, ErrorModal, UploadImage },
})
export default class ProfileComponent extends BaseComponent {
  private profile = {} as IUserDTO;
  private selectedLocale: string = "";
  private locales: string[] = [];
  private showUploadImage = false;
  created() {
    this.profile.email = this.$store.state.account.user.email;
    this.profile.firstName = this.$store.state.account.user.firstName;
    this.profile.lastName = this.$store.state.account.user.lastName;
    this.profile.phone = this.$store.state.account.user.phone;
    this.profile.loginType = this.$store.state.account.user.loginType;
  }
  mounted() {
    this.selectedLocale = this.$i18n.locale;
    supportedLocales.forEach((f) => {
      this.locales.push(f.lang);
    });
  }
  canChangePassword() {
    if (this.profile.loginType === LoginType.Password) {
      return true;
    }
    return false;
  }
  changedLocale(value) {
    console.log("changed locale :" + value);
    this.$store.commit("locale/updateLocale", value);
    this.$i18n.locale = value;
    this.$router.go(0);
  }
  updateProfile() {
    this.services.users
      .updateProfile(this.profile)
      .then((response) => {
        // @ts-ignore
        this.$refs["success-modal"].show(
          this.$t("settings.profile.profileUpdated")
        );
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  logout() {
    this.$store.dispatch("auth/logout");
  }
  updatePassword() {
    this.services.users
      .updatePassword(this.profile)
      .then((response) => {
        // @ts-ignore
        this.$refs["success-modal"].show(
          this.$t("settings.profile.passwordUpdated")
        );
        this.profile.passwordCurrent = "";
        this.profile.passwordNew = "";
        this.profile.passwordConfirm = "";
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  loadedImage(image) {
    this.services.users
      .uploadAvatar(image)
      .then((response) => {
        this.showUploadImage = false;
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  }

  get avatar() {
    return this.$store.state.account.user.avatar;
  }
}
</script>
