<template>
  <div>
    <div v-if="subscribeURL">
      <div class="max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div
          class="px-6 py-6 bg-primary rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center"
        >
          <div class="xl:w-0 xl:flex-1">
            <h2
              class="text-2xl leading-8 font-bold tracking-tight text-white sm:text-3xl sm:leading-9 text-primary"
            >
              {{ $t("marketing.newsletter.title") }}
            </h2>
            <p
              class="mt-3 max-w-3xl text-lg leading-6 text-primary"
              id="newsletter-headline"
            >
              {{ $t("marketing.newsletter.signUp") }}
            </p>
          </div>
          <div class="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <form
              @submit.prevent="subscribe()"
              class="sm:flex"
              aria-labelledby="newsletter-headline"
            >
              <input
                aria-label="Email address"
                type="email"
                name="EMAIL"
                v-model="email"
                requigray
                class="appearance-none w-full px-5 py-3 border border-gray-400 text-base leading-6 rounded-md text-theme-900 bg-white placeholder-theme-500 focus:outline-none focus:placeholder-theme-400 transition duration-150 ease-in-out"
                v-bind:placeholder="$t('marketing.newsletter.email')"
              />
              <div
                class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0"
              >
                <button
                  class="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-theme-700 hover:bg-theme-600 focus:outline-none focus:bg-theme-500 transition duration-150 ease-in-out"
                >
                  {{ $t("marketing.newsletter.subscribe") }}
                </button>
              </div>
            </form>
            <p class="mt-3 text-sm leading-5 text-primary">
              {{ $t("marketing.newsletter.wontSpam") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <success-modal
      ref="success-modal"
      :title="$t('marketing.newsletter.subscribedTitle')"
      :text="$t('marketing.newsletter.subscribedText')"
      :close="$t('marketing.newsletter.subscribedClose')"
    ></success-modal>
    <error-modal
      ref="error-modal"
      :title="$t('shared.error')"
      :text="$t('marketing.newsletter.errorText')"
      :close="$t('shared.close')"
    ></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";

@Component({
  components: { SuccessModal, ErrorModal },
})
export default class NewsletterComponent extends BaseComponent {
  private subscribeURL: string = "";
  private email: string = "";
  mounted() {
    // @ts-ignore
    this.subscribeURL = process.env.VUE_APP_INTEGRATIONS_NEWSLETTER_MAILCHIMP;
  }
  subscribe() {
    if (this.subscribeURL) {
      window.open(this.subscribeURL + "&EMAIL=" + this.email, "_blank");
      // // @ts-ignore
      // this.$refs["success-modal"].show();
    }
  }
}
</script>
