<template>
  <div class>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <marketing-logo></marketing-logo>
      </div>

      <div>
        <h2
          class="mt-6 text-center text-3xl leading-9 font-bold text-primary"
        >{{ $t("account.newPassword.title") }}</h2>
        <p class="mt-2 text-center text-sm leading-5 text-primary max-w">
          {{ $t("account.forgot.rememberedPassword") }}
          <a
            class="font-medium text-theme-500 hover:text-theme-400 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            <router-link :to="{ path: '/login' }">{{ $t("account.register.clickHereToLogin") }}</router-link>
          </a>
        </p>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-secondary py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form @submit.prevent="reset">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-5 text-primary"
                >{{ $t("account.shared.email") }}</label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    :disabled="true"
                    v-model="user.email"
                    id="email"
                    type="email"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div class="mt-6">
                <label
                  for="password"
                  class="block text-sm font-medium leading-5 text-primary"
                >{{ $t("account.shared.password") }}</label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    v-model="user.password"
                    id="password"
                    type="password"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div class="mt-6">
                <label
                  for="confirmPassword"
                  class="block text-sm font-medium leading-5 text-primary"
                >{{ $t("account.register.confirmPassword") }}</label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    v-model="user.passwordConfirm"
                    id="confirmPassword"
                    type="password"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="mt-6">
                <span class="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    class="relative block w-full py-2 px-3 border border-transparent rounded-md text-white font-semibold bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:shadow-outline sm:text-sm sm:leading-5"
                  >{{ $t("account.newPassword.button") }}</button>
                </span>
              </div>
            </form>
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
import GoogleSignInButton from "vue-google-signin-button-directive";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import MarketingLogo from "@/components/marketing/MarketingLogo.vue";
import { IVerifyDTO } from "../../app/models/system/account/IVerifyDTO";

@Component({
  components: { ErrorModal, MarketingLogo },
  directives: {
    GoogleSignInButton,
  },
})
export default class VerifyComponent extends BaseComponent {
  public droppedDown: boolean = false;
  public user = {} as IVerifyDTO;
  private created() {
    this.user.email = this.$route.query.e ? this.$route.query.e.toString() : "";
    this.user.token = this.$route.query.t ? this.$route.query.t.toString() : "";
    // console.log(this.user);
  }
  private reset() {
    this.loading = true;
    if (this.user.password !== this.user.passwordConfirm) {
      return;
    }
    this.services.authentication.verify(this.user).catch((error) => {
      // @ts-ignore
      this.$refs["error-modal"].show(error);
    });
  }
  private closeDropdown() {
    this.droppedDown = false;
  }
}
</script>

<style>
</style>
