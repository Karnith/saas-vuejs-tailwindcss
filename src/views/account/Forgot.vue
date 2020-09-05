<template>
  <div class>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <marketing-logo></marketing-logo>
      </div>

      <div v-if="!emailSent" class="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          class="mt-6 text-center text-3xl leading-9 font-bold text-primary"
        >{{ $t("account.reset.title") }}</h2>
        <p
          class="mt-5 text-sm leading-5 text-center text-primary"
        >{{ $t("account.reset.headline") }}</p>
        <div class="mt-8 bg-secondary py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form @submit.prevent="reset()">
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-5 text-primary"
              >{{ $t("account.shared.email") }}</label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  v-model="email"
                  id="email"
                  type="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-6">
              <span class="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  class="relative block w-full py-2 px-3 border border-transparent rounded-md text-white font-semibold bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:shadow-outline sm:text-sm sm:leading-5"
                >{{ $t("account.reset.button") }}</button>
              </span>
            </div>
          </form>
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm leading-5">
                <span
                  class="px-2 bg-secondary text-gray-500"
                >{{ $t("account.forgot.rememberedPassword") }}</span>
              </div>
            </div>

            <div class="mt-6">
              <div>
                <span class="w-full inline-flex rounded-md shadow-sm">
                  <router-link
                    aria-label="Gmail"
                    class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-secondary text-sm leading-5 font-medium text-primary hover:text-theme-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                    tag="button"
                    :to="{ path: 'login' }"
                  >{{ $t("account.forgot.backToLogin") }}</router-link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          class="bg-secondary max-w-md w-full mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8"
        >
          <h2 class="text-xl font-black">
            <h2
              class="mt-6 text-center text-3xl leading-9 font-bold text-primary"
            >{{ $t("account.reset.resetSuccess") }}</h2>
          </h2>
          <div class="my-4 leading-tight">
            <p
              class="mt-2 text-center text-sm leading-5 text-primary max-w"
            >{{ $t("account.reset.emailSent") }}</p>
            <p
              v-if="verifyToken != ''"
              class="mt-2 text-center text-sm leading-5 text-primary max-w"
            >
              <a
                :href="verifyURL"
                class="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >{{ $t("account.register.clickHereToVerify") }}</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <error-modal ref="error-modal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import MarketingLogo from "@/components/marketing/MarketingLogo.vue";

@Component({
  components: { SuccessModal, ErrorModal, MarketingLogo },
})
export default class ForgotComponent extends BaseComponent {
  private emailSent: boolean = false;
  private email: string = "";
  private verifyToken: string = "";
  created() {
    this.email = this.$route.query.e ? this.$route.query.e.toString() : "";
  }
  reset() {
    this.services.authentication
      .reset(this.email)
      .then((response: any) => {
        this.emailSent = true;
        this.verifyToken = response.data.verifyToken;
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }

  get verifyURL() {
    if (this.verifyToken) {
      return "/account/verify?e=" + this.email + "&t=" + this.verifyToken;
    }
    return "";
  }
}
</script>

<style></style>
