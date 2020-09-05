<template>
  <div>
    <div v-if="subscription && subscription.status === 'trialing' && !stripeCard">
      <div class="rounded-md bg-yellow-100 p-4">
        <router-link to="/app/settings/organization/subscription" class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3 flex-1 md:flex md:justify-between">
            <p class="text-sm leading-5 text-blue-700">
              {{ $t("settings.tenant.subscription.trialing") }}
              {{ getEndOfTrial }}
              <span
                class="text-orange-500"
              >({{ getEndsIn }})</span>
            </p>
            <!-- <p class="mt-3 text-sm leading-5 md:mt-0 md:ml-6">
                  <a
                   
                    class="whitespace-no-wrap font-medium text-blue-700 hover:text-blue-600 transition ease-in-out duration-150"
                  >Details &rarr;</a>
            </p>-->
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../../components/shared/BaseComponent.vue";
import Stripe from "stripe";
import { mapGetters } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapGetters("tenant", {
      stripeCard: "defaultStripeCard",
      subscription: "subscription",
    }),
  },
})
export default class TenantSubscriptionStatus extends BaseComponent {
  public subscription!: Stripe.Subscription;
  mounted() {
    this.services.stripe.getCurrentCustomer();
  }

  get getEndOfTrial() {
    if (this.subscription) {
      // @ts-ignore
      const date = new Date(this.subscription.trial_end * 1000);

      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round(
        Math.abs((date.getTime() - Date.now()) / oneDay)
      );
      return this.$d(date, "short", this.$store.state.locale.locale);
    }

    return "";
  }
  get getEndsIn() {
    if (this.subscription) {
      // @ts-ignore
      const date = new Date(this.subscription.trial_end * 1000);

      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round(
        Math.abs((date.getTime() - Date.now()) / oneDay)
      );
      let untilDate: string =
        this.$t("shared.ends") +
        " " +
        this.$t("shared.in") +
        " " +
        diffDays +
        " " +
        this.$t("shared.days");
      if (diffDays === 0) {
        untilDate = this.$t("shared.today").toString();
      } else if (diffDays === 1) {
        untilDate = this.$t("shared.tomorrow").toString();
      }
      return untilDate;
    }

    return "";
  }
}
</script>
