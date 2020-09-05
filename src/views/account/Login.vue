<template>
  <div class>
    <!-- <div v-if="loading">Loading</div>
    <div v-else>-->
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <marketing-logo></marketing-logo>
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          class="mt-6 text-center text-3xl leading-9 font-bold text-primary"
        >{{ $t("account.login.title") }}</h2>
        <p class="mt-2 text-center text-sm leading-5 text-primary max-w">
          {{ $t("shared.or") }}
          <a
            class="font-medium text-theme-500 hover:text-theme-400 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            <router-link :to="{ path: '/pricing' }">
              {{
              $t("account.login.orStartTrial")
              }}
            </router-link>
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-theme-100 mb-2 rounded-md border border-theme-300 -mt-2">
          <div class="rounded-md bg-theme-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-theme-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <div class="ml-3">
                <h3
                  class="text-sm leading-5 font-medium text-theme-800"
                >{{ $t("netcoresaas.backendNeeded") }}</h3>
                <div class="mt-2 text-sm leading-5 text-theme-700">
                  <p>{{ $t("netcoresaas.fakeLoginAdmin") }}</p>
                  <p>{{ $t("netcoresaas.fakeLoginTenant") }}</p>
                  <p>{{ $t("netcoresaas.fakeLoginPassword") }}</p>
                </div>
                <div class="text-sm leading-5 right-0 -ml-3 mt-2">
                  <span class="inline-flex rounded-md ml-2">
                    <a
                      href="https://netcoresaas.com/product"
                      target="_blank"
                      class="flex items-center justify-center px-4 py-2 border border-transparent text-sm bg-theme-200 leading-5 font-medium rounded-md text-theme-800 bg-white hover:text-theme-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                    >{{ $t("netcoresaas.getBackend") }}</a>
                  </span>
                  <span class="inline-flex rounded-md ml-2">
                    <a
                      href="https://demo.netcoresaas.com"
                      target="_blank"
                      class="flex items-center justify-center px-4 py-2 border border-transparent text-sm bg-theme-200 leading-5 font-medium rounded-md text-theme-800 bg-white hover:text-theme-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                    >{{ $t("netcoresaas.demo") }}</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-secondary py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form @submit.prevent="login()">
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-5 text-primary"
              >{{ $t("account.shared.email") }}</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <!-- <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>-->
                <input
                  v-model="user.email"
                  id="email"
                  type="email"
                  required
                  :placeholder="$t('account.shared.email')"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-6">
              <label
                for="current-password"
                class="block text-sm font-medium leading-5 text-primary"
              >{{ $t("account.shared.password") }}</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <!-- <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
                    />
                  </svg>
                </div>-->
                <input
                  :placeholder="$t('account.shared.password')"
                  v-model="user.password"
                  id="current-password"
                  type="password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-6 flex items-center justify-between">
              <div class="flex items-center">
                <!-- <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-gray-700 transition duration-150 ease-in-out">
            <label for="remember_me" class="ml-2 block text-sm leading-5 text-primary">
              Remember me
                </label>-->
              </div>

              <div class="text-sm leading-5">
                <a
                  class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  <router-link :to="{ path: 'forgot' }">{{ $t("account.login.forgot") }}</router-link>
                </a>
              </div>
            </div>

            <div class="mt-6">
              <span class="block w-full rounded-md shadow-sm">
                <loading-button class="w-full block" type="submit" ref="loadingButton">
                  <span class="absolute left-0 inset-y pl-3">
                    <svg class="h-5 w-5 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  {{ $t("account.login.button") }}
                </loading-button>
                <!-- <button
                  type="submit"
                  :disabled="loading"
                  class="relative block w-full py-2 px-3 border border-transparent rounded-md text-white font-semibold bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:shadow-outline sm:text-sm sm:leading-5 disabled:cursor-not-allowed"
                >
                  <span class="absolute left-0 inset-y pl-3">
                    <svg class="h-5 w-5 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  {{ $t("account.login.button") }}
                </button>-->
              </span>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-500"></div>
              </div>
              <div class="relative flex justify-center text-sm leading-5">
                <span class="px-2 bg-secondary text-gray-500">
                  {{
                  $t("account.login.orSignInUsing")
                  }}
                </span>
              </div>
            </div>

            <div class="mt-6">
              <div>
                <span class="w-full inline-flex rounded-md shadow-sm">
                  <button
                    v-google-signin-button="googleClientId"
                    type="button"
                    class="hover:border-gray-400 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-secondary text-sm leading-5 font-medium text-primary hover:text-gray-400 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray transition duration-150 ease-in-out"
                    aria-label="Gmail"
                  >
                    <!-- Google Icon -->
                    <svg viewBox="0 0 48 48" width="24px" height="24px">
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-else>{{tenant.name}}</div> -->
    <!-- </div> -->
    <error-modal
      ref="errorModal"
      :title="$t('shared.error')"
      :text="$t('account.login.errorText')"
      :closeText="$t('shared.close')"
    ></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import LoadingButton from "../../components/shared/buttons/LoadingButton.vue";
import GoogleSignInButton from "vue-google-signin-button-directive";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import axios from "axios";
import { ILoginDTO } from "../../app/models/system/account/ILoginDTO";
import { LoginType } from "../../app/models/system/account/IUserDTO";
import MarketingLogo from "@/components/marketing/MarketingLogo.vue";
import { ITenantDTO } from "../../app/models/system/account/ITenantDTO";

@Component({
  components: { ErrorModal, MarketingLogo, LoadingButton },
  directives: {
    GoogleSignInButton,
  },
})
export default class LoginComponent extends BaseComponent {
  public googleClientId: any = "";
  public user = {} as ILoginDTO;
  $refs!: {
    errorModal: HTMLFormElement;
  };
  private tenant: ITenantDTO | undefined = undefined;
  created() {
    // @ts-ignore
    this.googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID_OAUTH2;
  }
  mounted() {
    // this.loading = true;
    // this.services.tenants
    //   .getFromURL()
    //   .then((response: any) => {
    //     this.tenant = response.data;
    //   })
    //   .finally(() => {
    //     this.loading = false;
    //   });
  }
  OnGoogleAuthSuccess(idToken) {
    axios
      .get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + idToken)
      .then((response: any) => {
        this.user.email = response.data.email;
        // @ts-ignore
        this.user.secretSignInKey = process.env.VUE_APP_SECRETSIGNINKEY?.toString();
        this.login(LoginType.Gmail);
      });
  }
  OnGoogleAuthFail(error) {
    console.error("Error: " + error);
  }
  login(type: LoginType = LoginType.Password) {
    // @ts-ignore
    this.$refs.loadingButton.start();
    this.loading = true;
    this.user.loginType = type;
    this.services.authentication
      .login(this.user)
      .then((response) => {
        // this.$router.push("/app/dashboard");
      })
      .catch((error) => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        // @ts-ignore
        this.$refs.loadingButton.stop();
        this.loading = false;
      });
  }
}
</script>

<style></style>
