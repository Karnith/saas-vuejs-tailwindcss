<template>
  <div class>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <marketing-logo></marketing-logo>
      </div>

      <div>
        <h2
          class="mt-6 text-center text-3xl leading-9 font-bold text-primary"
        >{{ $t("account.verify.title") }}</h2>
        <p class="mt-2 text-center text-sm leading-5 text-primary max-w">
          {{ $t("account.register.alreadyRegistered") }}
          <a
            class="font-medium text-theme-500 hover:text-theme-400 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            <router-link :to="{ path: '/login' }">
              {{
              $t("account.register.clickHereToLogin")
              }}
            </router-link>
          </a>
        </p>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-secondary py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form @submit.prevent="verify">
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
              <div v-if="requireCompany" class="mt-6">
                <label
                  for="company"
                  class="block text-sm font-medium leading-5 text-primary"
                >{{ $t("account.register.company") }}</label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    v-model="user.company"
                    id="company"
                    type="text"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div v-if="requireName" class="mt-6">
                <label
                  for="firstName"
                  class="block text-sm font-medium leading-5 text-primary"
                >{{ $t("account.register.firstName") }}</label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    v-model="user.firstName"
                    id="firstName"
                    type="text"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div v-if="requireName" class="mt-6">
                <label
                  for="lastName"
                  class="block text-sm font-medium leading-5 text-primary"
                >{{ $t("account.register.lastName") }}</label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    v-model="user.lastName"
                    id="lastName"
                    type="text"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div v-if="requirePassword" class="mt-6">
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
              <div v-if="requirePassword" class="mt-6">
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
                  <loading-button
                    class="w-full block"
                    type="submit"
                    ref="loadingButton"
                  >{{ $t("account.verify.button") }}</loading-button>
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
import MarketingLogo from "@/components/marketing/MarketingLogo.vue";
import { IVerifyDTO } from "../../app/models/system/account/IVerifyDTO";

@Component({
  components: { MarketingLogo },
  directives: {
    GoogleSignInButton,
  },
})
export default class VerifyComponent extends BaseComponent {
  public requireCompany: boolean = false;
  public requireName: boolean = false;
  public requirePassword: boolean = true;
  public droppedDown: boolean = false;
  public user = {} as IVerifyDTO;
  private created() {
    this.user.email = this.$route.query.e ? this.$route.query.e.toString() : "";
    this.user.token = this.$route.query.t ? this.$route.query.t.toString() : "";
    // console.log(this.user);
  }
  private verify() {
    this.loading = true;
    // @ts-ignore
    this.$refs.loadingButton.start();
    if (this.user.password !== this.user.passwordConfirm) {
      // @ts-ignore
      this.$refs["error-modal"].show(
        this.$t("account.login.errors.passwordMissmatch")
      );
      return;
    }
    this.services.authentication
      .verify(this.user)
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      })
      .finally(() => {
        // @ts-ignore
        this.$refs.loadingButton.stop();
      });
  }
  private closeDropdown() {
    this.droppedDown = false;
  }
}
</script>

<style></style>
