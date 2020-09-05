<template>
  <div>
    <Header></Header>
    <section class="text-primary body-font relative">
      <div class="container px-5 py-5 mx-auto">
        <div class="flex flex-col text-center w-full mb-6">
          <h1
            class="sm:text-4xl text-3xl font-medium title-font mb-2 text-secondary"
          >
            {{ $t("marketing.contact.title") }}
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            {{ $t("marketing.contact.headline") }}
          </p>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <form class="flex flex-wrap -m-2" :action="actionURL" method="POST">
            <div class="p-2 w-1/2">
              <input
                name="name"
                v-bind="form.name"
                class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-theme-500 text-base px-4 py-2"
                v-bind:placeholder="$t('marketing.contact.name')"
                type="text"
              />
            </div>
            <div class="p-2 w-1/2">
              <input
                name="_replyto"
                v-bind="form.email"
                class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-theme-500 text-base px-4 py-2"
                v-bind:placeholder="$t('marketing.contact.email')"
                type="email"
              />
            </div>
            <div class="p-2 w-full">
              <textarea
                name="message"
                v-bind="form.message"
                class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none h-48 focus:border-theme-500 text-base px-4 py-2 resize-none block"
                v-bind:placeholder="$t('marketing.contact.message')"
              ></textarea>
            </div>
            <div class="p-2 w-full">
              <button
                :disabled="!actionURL"
                type="submit"
                class="flex ml-auto text-white bg-theme-500 border-0 py-2 px-8 focus:outline-none hover:bg-theme-600 rounded text-lg"
              >
                {{ $t("marketing.contact.send") }}
              </button>
            </div>
            <div
              class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center"
            >
              <a class="text-theme-500">{{ emailSupport }}</a>

              <span class="inline-flex">
                <a v-if="facebook" v-bind:href="facebook" class="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                    />
                  </svg>
                </a>
                <a
                  v-if="twitter"
                  v-bind:href="twitter"
                  class="ml-4 text-gray-500"
                >
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                    />
                  </svg>
                </a>
                <a
                  v-if="instagram"
                  v-bind:href="instagram"
                  class="ml-4 text-gray-500"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path
                      d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
                    />
                  </svg>
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
    <success-modal
      ref="success-modal"
      :title="$t('marketing.contact.sentTitle')"
      :text="$t('marketing.contact.sentMessage')"
      :close="$t('marketing.contact.close')"
    ></success-modal>
    <error-modal
      ref="error-modal"
      :title="$t('shared.error')"
      :text="$t('marketing.newsletter.errorText')"
      :closeText="$t('shared.close')"
    ></error-modal>
  </div>
</template>

<script>
import Header from "@/components/marketing/Header.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import axios from "axios";

export default {
  components: {
    Header,
    SuccessModal,
    ErrorModal,
  },
  data() {
    return {
      sent: false,
      form: {
        name: "",
        email: "",
        message: "",
      },
      emailSupport: "",
      facebook: "",
      instagram: "",
      twitter: "",
      actionURL: "",
    };
  },
  mounted() {
    this.facebook = process.env.VUE_APP_SOCIAL_FACEBOOK;
    this.instagram = process.env.VUE_APP_SOCIAL_INSTAGRAM;
    this.twitter = process.env.VUE_APP_SOCIAL_TWITTER;
    this.actionURL = process.env.VUE_APP_INTEGRATIONS_CONTACT_FORMSPREE;
  },
  methods: {
    send() {
      // axios
      //   .("contact", this.form)
      //   .then((response) => {
      //     console.log(response);
      //     this.$refs["success-modal"].show();
      //   })
      //   .catch((error) => {
      //     this.$refs["error-modal"].show(error.message);
      //   });
    },
  },
};
</script>
