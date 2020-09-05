<template>
  <div class>
    <div
      class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <marketing-logo></marketing-logo>
      </div>

      <div v-if="!registered">
        <h2
          class="mt-6 text-center text-3xl leading-9 font-bold text-secondary"
        >
          {{ $t("account.register.title") }}
        </h2>
        <p class="mt-2 text-center text-sm leading-5 text-secondary max-w">
          {{ $t("account.register.alreadyRegistered") }}
          <a
            class="font-medium text-theme-500 hover:text-theme-400 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            <router-link :to="{ path: '/login' }">{{
              $t("account.register.clickHereToLogin")
            }}</router-link>
          </a>
        </p>
        <div class="w-full flex justify-center mt-4">
          <Billing-Period-Toggle
            v-if="!selectedPriceOnce()"
          ></Billing-Period-Toggle>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-secondary py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form @submit.prevent="tryRegisterWithPassword">
              <div class>
                <label
                  for="company"
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.register.organization") }}</label
                >
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    v-model="user.organization"
                    :placeholder="$t('account.register.organization')"
                    id="company"
                    type="text"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div class="mt-6">
                <label
                  for="email"
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.shared.email") }}</label
                >
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    v-model="user.email"
                    :placeholder="$t('account.shared.email')"
                    id="email"
                    type="email"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div v-if="requireName" class="mt-6">
                <label
                  for="firstName"
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.register.firstName") }}</label
                >
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    v-model="user.firstName"
                    :placeholder="$t('account.register.firstName')"
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
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.register.lastName") }}</label
                >
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    v-model="user.lastName"
                    :placeholder="$t('account.register.lastName')"
                    id="lastName"
                    type="text"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div v-if="requirePhone" class="mt-6">
                <label
                  for="phone"
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("settings.profile.phone") }}</label
                >
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    v-model="user.phone"
                    :placeholder="$t('settings.profile.phone')"
                    id="phone"
                    type="text"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div v-if="requirePassword" class="mt-6">
                <label
                  for="password"
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.register.password") }}</label
                >
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
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.register.confirmPassword") }}</label
                >
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    v-model="user.confirmPassword"
                    id="confirmPassword"
                    type="password"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="mt-6">
                <!--
          Custom select controls like this require a considerable amount of JS to implement from scratch. We're planning
          to build some low-level libraries to make this easier with popular frameworks like React, Vue, and even Alpine.js
          in the near future, but in the mean time we recommend these reference guides when building your implementation:

          https://www.w3.org/TR/wai-aria-practices/#Listbox
          https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
                -->
                <div class="space-y-1" v-click-outside="closeDropdown">
                  <plans ref="plans"></plans>
                </div>
              </div>

              <div class="mt-6">
                <span class="block w-full rounded-md shadow-sm">
                  <loading-button
                    class="w-full block"
                    type="submit"
                    ref="loadingButton"
                  >
                    <span v-if="selectedPrice.trialDays > 0">
                      {{
                        $t("account.register.startTrial", [
                          selectedPrice.trialDays,
                        ])
                      }}
                    </span>
                    <span v-else>{{ getButtonText }}</span>
                  </loading-button>
                  <!-- <button
                    type="submit"
                    class="block w-full py-2 px-3 border border-transparent rounded-md text-white font-semibold bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:shadow-outline sm:text-sm sm:leading-5"
                  >
                    <span v-if="selectedPrice.trialDays > 0">
                      {{
                      $t("account.register.startTrial", [
                      selectedPrice.trialDays,
                      ])
                      }}
                    </span>
                    <span v-else>{{ getButtonText }}</span>
                  </button>-->
                </span>
              </div>

              <div class="z-0 mt-6">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm leading-5">
                    <span class="px-2 bg-secondary text-gray-500">{{
                      $t("account.register.orSignUpUsing")
                    }}</span>
                  </div>
                </div>

                <div class="mt-6">
                  <div>
                    <span class="w-full inline-flex rounded-md shadow-sm">
                      <button
                        v-google-signin-button="googleClientId"
                        type="submit"
                        class="hover:border-gray-400 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-secondary text-sm leading-5 font-medium text-secondary hover:text-gray-400 focus:outline-none focus:border-theme-300 focus:shadow-outline-theme transition duration-150 ease-in-out"
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
            </form>
          </div>
          <div
            class="bg-theme-100 mb-2 rounded-md border border-theme-300 mt-8"
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
                    {{ $t("netcoresaas.backendNeeded") }}
                  </h3>
                  <div class="mt-2 text-sm leading-5 text-theme-700">
                    <p>{{ $t("netcoresaas.fakeRegister") }}</p>
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
      </div>
      <div v-else class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          class="bg-secondary max-w-md w-full mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8"
        >
          <h2
            class="mt-6 text-center text-3xl leading-9 font-bold text-secondary"
          >
            {{ $t("account.register.successTitle") }}
          </h2>
          <div class="my-4 leading-tight">
            <p class="mt-2 text-center text-sm leading-5 text-secondary max-w">
              {{ $t("account.register.successText") }}
            </p>
            <p
              v-if="verifyToken"
              class="mt-2 text-center text-sm leading-5 text-secondary max-w"
            >
              <a
                :href="verifyURL"
                class="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >{{ $t("account.register.clickHereToVerify") }}</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <modal ref="card-modal">
      <div>
        <card
          ref="card"
          class="stripe-card w-full mt-5 mb-5"
          :class="cardCompleted ? 'border-1 border-green-100' : ''"
          :stripe="stripeKey"
          :options="stripeOptions"
          @change="cardCompleted = $event.complete"
        />

        <button
          class="block w-full py-2 px-3 border border-transparent rounded-md text-white font-semibold bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:shadow-outline sm:text-sm sm:leading-5"
          @click="pay"
          :disabled="!cardCompleted"
        >
          {{ getButtonText }}
        </button>
      </div>
    </modal>
    <error-modal
      ref="error-modal"
      :title="$t('shared.error')"
      :text="$t('account.register.errorText')"
      :closeText="$t('shared.close')"
    ></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import GoogleSignInButton from "vue-google-signin-button-directive";
import LoadingButton from "@/components/shared/buttons/LoadingButton.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import Modal from "@/components/shared/modals/Modal.vue";
import axios from "axios";
import { StripeProduct } from "../../app/models/subscription/StripeProduct";
import BillingPeriodToggle from "../../components/marketing/toggles/BillingPeriodToggle.vue";
import { Card, createToken } from "vue-stripe-elements-plus";
import { IRegisterDTO } from "../../app/models/system/account/IRegisterDTO";
import { LoginType } from "../../app/models/system/account/IUserDTO";
import Plans from "@/components/marketing/Plans.vue";
import MarketingLogo from "@/components/marketing/MarketingLogo.vue";
import {
  StripePrice,
  BillingPeriod,
} from "../../app/models/subscription/StripePrice";

@Component({
  components: {
    BillingPeriodToggle,
    ErrorModal,
    Modal,
    Card,
    Plans,
    MarketingLogo,
    LoadingButton,
  },
  directives: {
    GoogleSignInButton,
  },
})
export default class RegisterComponent extends BaseComponent {
  public requireName: boolean = true;
  public requirePhone: boolean = false;
  public requirePassword: boolean = false;
  public droppedDown: boolean = false;
  public googleClientId: any = "";
  public user = {} as IRegisterDTO;
  private email: string = "";
  private verifyToken: string = "";
  private stripeKey: string = "";
  private stripeOptions: any = {};
  private cardCompleted: boolean = false;
  private registered: boolean = false;
  created() {
    if (this.$route.query.e) {
      this.user.email = this.$route.query.e.toString();
    }
    if (this.$store.state.pricing.products.length === 0) {
      this.services.stripe.getProducts(false, true);
    }
    if (!this.selectedProduct) {
      this.$store.commit("pricing/select", {
        product: this.products[0],
        billingPeriod: this.$store.state.pricing.billingPeriod,
      });
    }
    // @ts-ignore
    this.googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID_OAUTH2.toString();
    // @ts-ignore
    this.stripeKey = process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY.toString();
    this.stripeOptions = {
      showCardHolderName: true,
      hidePostalCode: false,
      iconStyle: "solid",
      elements: {
        locale: this.$i18n.locale,
      },
    };
  }
  private OnGoogleAuthSuccess(idToken) {
    axios
      .get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + idToken)
      .then((response) => {
        this.user.firstName = response.data.given_name;
        this.user.lastName = response.data.family_name;
        this.user.email = response.data.email;
        if (!this.user.organization || this.user.organization.trim() === "") {
          // @ts-ignore
          this.$refs["error-modal"].show(
            this.$t("account.register.setTenantName")
          );
        } else {
          this.tryRegister(LoginType.Gmail);
        }
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  private OnGoogleAuthFail(error) {
    // @ts-ignore
    this.$refs["error-modal"].show(error);
  }
  private tryRegisterWithPassword() {
    this.tryRegister(LoginType.Password);
  }
  private tryRegister(loginType: LoginType = LoginType.Password) {
    this.email = this.user.email;
    this.user.loginType = loginType;
    this.user.stripePrice = this.selectedPrice;
    // @ts-ignore
    this.user.secretSignInKey = process.env.VUE_APP_SECRETSIGNINKEY?.toString();
    // if (this.selectedPrice.trialDays === 0 && this.selectedPrice.price > 0) {
    //   // @ts-ignore
    //   this.$refs["card-modal"].show(
    //     this.$t("account.register.providePaymentDetails"),
    //     this.$t("shared.cancel")
    //   );
    // } else {
    //   this.register();
    // }
    this.register();
  }
  private pay() {
    createToken()
      .then((data) => {
        if (data.error) {
          // @ts-ignore
          this.$refs["error-modal"].show(data.error.message);
        } else {
          this.register(data.token.id);
        }
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      })
      .finally(() => {
        // @ts-ignore
        this.$refs["card-modal"].close();
      });
  }
  private register(stripeCardToken: string = "") {
    this.user.stripeCardToken = stripeCardToken;
    // @ts-ignore
    this.$refs.loadingButton.start();
    this.services.authentication
      .register(this.user)
      .then((response: any) => {
        this.registered = true;
        this.verifyToken = response.data.verifyToken;
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      })
      .finally(() => {
        // @ts-ignore
        this.$refs.loadingButton.stop();
      });
  }
  private changeProduct(product) {
    this.closeDropdown();
    this.$store.commit("pricing/select", product);
  }
  private closeDropdown() {
    this.droppedDown = false;
  }
  private selectedPriceOnce() {
    return (
      !this.selectedPrice ||
      this.selectedPrice.billingPeriod === BillingPeriod.Once
    );
  }
  get products() {
    return this.$store.state.pricing.products;
  }
  get verifyURL() {
    if (this.verifyToken && this.verifyToken !== "") {
      return "/account/verify?e=" + this.email + "&t=" + this.verifyToken;
    }
    return "";
  }
  get getButtonText() {
    return (
      (this.selectedPrice.billingPeriod === BillingPeriod.Once
        ? this.$t("marketing.pricing.pay")
        : this.$t("marketing.pricing.subscribe")) +
      " " +
      this.priceDescription
    );
  }
  get selectedPrice() {
    return (
      this.selectedProduct.prices.find(
        (f) =>
          f.billingPeriod === this.$store.state.pricing.billingPeriod &&
          f.currency === this.$store.state.pricing.currency
      ) ??
      this.selectedProduct?.prices.filter(
        (f) => f.currency === this.$store.state.pricing.currency
      )[0]
    );
  }
  get billingPeriod() {
    if (this.selectedPrice.billingPeriod === BillingPeriod.Once) {
      return this.$t("marketing.pricing.once");
    } else {
      return (
        "/ " +
        this.$t(
          "marketing.pricing." +
            BillingPeriod[this.selectedPrice.billingPeriod] +
            "Short"
        )
      );
    }
  }
  get priceDescription() {
    return "$" + this.selectedPrice.price + " " + this.billingPeriod;
  }
  get selectedProduct(): StripeProduct {
    return this.$store.state.pricing.selectedProduct as StripeProduct;
  }
}
</script>

<style></style>
