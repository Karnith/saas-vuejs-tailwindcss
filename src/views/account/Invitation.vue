<template>
  <div :class="marketingTheme + ' ' + marketingColor">
    <div
      class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      :class="tenantTheme"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div v-if="tenant && (tenant.logo || tenant.logoDarkmode)">
          <router-link to="/product">
            <img
              v-if="tenant.appTheme !== 'theme-bg-dark'"
              :src="tenant.logo"
              class="mx-auto h-16 w-auto"
            />
            <img
              v-else
              :src="tenant.logoDarkmode"
              class="mx-auto h-16 w-auto"
            />
          </router-link>
        </div>
        <marketing-logo v-else></marketing-logo>
      </div>
      <!-- {{invitation}} -->
      <div v-if="loading">
        <!-- {{ $t("shared.loading") }} -->
      </div>
      <div
        v-else-if="!invitation || !invitation.user"
        class="text-red-500 text-center"
      >
        {{ $t("shared.invalidInvitation") }}
      </div>
      <div v-if="invitation && invitation.user">
        <h2 class="mt-6 text-center text-2xl leading-9 font-bold text-primary">
          {{ $t("shared.hi") }}
          {{
            invitation.user.firstName
              ? invitation.user.firstName
              : invitation.user.email
          }}, {{ $t("account.invitation.youWereInvited") }}
          {{ invitation.tenant.name }}
        </h2>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-secondary py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form @submit.prevent="accept">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-5 text-primary"
                  >{{ $t("account.shared.email") }}</label
                >
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
              <div v-if="requirePassword" class="mt-6">
                <label
                  for="password"
                  class="block text-sm font-medium leading-5 text-primary"
                  >{{ $t("account.shared.password") }}</label
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
                  class="block text-sm font-medium leading-5 text-primary"
                  >{{ $t("account.register.confirmPassword") }}</label
                >
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
                  >
                    {{ $t("account.invitation.button") }}
                  </loading-button>
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
import { ITenantDTO } from "../../app/models/system/account/ITenantDTO";
import { mapGetters } from "vuex";
import { defaultState } from "../../store/modules/theme";
import { IVerifyDTO } from "../../app/models/system/account/IVerifyDTO";

@Component({
  components: { ErrorModal, MarketingLogo },
  directives: {
    GoogleSignInButton,
  },
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor",
    }),
  },
})
export default class InvitationComponent extends BaseComponent {
  public requirePassword: boolean = true;
  public user = {} as IVerifyDTO;
  public invitation = {} as any;
  public tenant = {} as ITenantDTO;
  private created() {
    this.user.token = this.$route.query.i ? this.$route.query.i.toString() : "";
    this.user.email = this.$route.query.e ? this.$route.query.e.toString() : "";
  }
  private mounted() {
    if (this.$route.query.i) {
      this.loading = true;
      this.$store.commit("theme/marketingTheme", defaultState.marketingTheme);
      this.$store.commit("theme/marketingColor", defaultState.marketingColor);
      this.services.tenantUsers
        .getInvitation(this.$route.query.i.toString())
        .then((response: any) => {
          this.invitation = response.data.invitation;
          this.tenant = response.data.tenant;
          this.requirePassword = response.data.requiresVerify;

          if (this.tenant.appTheme) {
            this.$store.commit("theme/marketingTheme", this.tenant.appTheme);
          }
          if (this.tenant.appColor) {
            this.$store.commit("theme/marketingColor", this.tenant.appColor);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
  private accept() {
    if (this.user.password !== this.user.passwordConfirm) {
      return;
    }

    // @ts-ignore
    this.$refs.loadingButton.start();
    this.services.tenantUsers
      .acceptInvitation(this.user)
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      })
      .finally(() => {
        // @ts-ignore
        this.$refs.loadingButton.stop();
      });
  }
  get tenantTheme() {
    if (this.tenant) {
      return this.tenant.appTheme + " " + this.tenant.appColor;
    }
  }
}
</script>

<style></style>
