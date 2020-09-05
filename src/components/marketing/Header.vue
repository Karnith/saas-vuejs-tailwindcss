<template>
  <div>
    <div class="bg-secondary shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          class="flex justify-between items-center border-gray-100 py-2 md:justify-start md:space-x-10"
        >
          <div>
            <color-switcher></color-switcher>
          </div>
          <div class="lg:w-0 lg:flex-1">
            <router-link class="hidden lg:block" to="/product">
              <img
                v-if="marketingTheme === 'theme-bg-light'"
                class="h-auto h-14 sm:h-10"
                src="@/assets/img/logo.png"
                alt="logo"
              />
              <img v-else class="h-auto h-14 sm:h-10" src="@/assets/img/logo-dark.png" alt="logo" />
            </router-link>
          </div>
          <div class="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-primary-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-primary transition duration-150 ease-in-out"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav class="hidden md:flex space-x-8">
            <a
              class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150"
            >
              <router-link to="/product">{{ $t("marketing.navbar.product") }}</router-link>
            </a>
            <a
              class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150"
            >
              <router-link to="/pricing">{{ $t("marketing.navbar.pricing") }}</router-link>
            </a>
            <a
              class="hidden lg:block text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150"
            >
              <router-link to="/contact">{{ $t("marketing.navbar.contact") }}</router-link>
            </a>
            <a
              class="hidden lg:block text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150"
            >
              <router-link to="/blog">{{ $t("marketing.navbar.blog") }}</router-link>
            </a>
          </nav>
          <span class="inline-flex">
            <dark-mode-toggle></dark-mode-toggle>
          </span>
          <span class="inline-flex">
            <flag-selector></flag-selector>
          </span>
          <div
            v-if="!$store.state.auth.authenticated"
            class="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0"
          >
            <router-link
              to="login"
              class="space-no-wrap text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus"
            >
              <div>{{ $t("marketing.navbar.signIn") }}</div>
            </router-link>
            <span class="md:inline-flex rounded-md shadow-sm hidden">
              <router-link
                to="/pricing"
                class="space-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:border-theme-600 focus:shadow-outline-indigo active:bg-theme-600 transition ease-in-out duration-150"
              >
                <div>{{ $t("marketing.product.getStarted") }}</div>
              </router-link>
            </span>
          </div>
          <div v-else class="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
            <router-link
              to="/app"
              class="inline-flex items-center bg-primary border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
            >
              {{ $t("marketing.navbar.dashboard") }}
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>

      <!--
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
      -->
      <div
        class="z-50 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden w-full"
      >
        <div class="bg-secondary divide-y-1 divide-gray-50 rounded-lg shadow-lg">
          <div class="pt-2 pb-3 px-5 space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <router-link class="flex" to="/product">
                  <img
                    v-if="marketingTheme === 'theme-bg-light'"
                    class="h-8 w-auto"
                    src="@/assets/img/logo.png"
                    alt="logo"
                  />
                  <img v-else class="h-8 w-auto" src="@/assets/img/logo-dark.png" alt="logo" />
                </router-link>
              </div>
              <div class="-mr-2">
                <button
                  v-on:click="droppedDown = !droppedDown"
                  type="button"
                  class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary focus:outline-none focus:bg-secondary focus:text-primary transition duration-150 ease-in-out"
                >
                  <svg
                    v-if="droppedDown"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <svg
                    v-else
                    class="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6 rounded-lg" v-if="droppedDown">
            <div class="grid grid-cols-2 gap-y-4 gap-x-8 transition-all ease-in">
              <router-link
                @click.native="droppedDown = !droppedDown"
                to="/product"
                class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150"
              >
                <div>{{ $t("marketing.navbar.product") }}</div>
              </router-link>
              <router-link
                @click.native="droppedDown = !droppedDown"
                to="/pricing"
                class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150"
              >
                <div>{{ $t("marketing.navbar.pricing") }}</div>
              </router-link>
              <router-link
                @click.native="droppedDown = !droppedDown"
                to="/contact"
                class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150"
              >
                <div>{{ $t("marketing.navbar.contact") }}</div>
              </router-link>
              <router-link
                @click.native="droppedDown = !droppedDown"
                to="/blog"
                class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150"
              >
                <div>{{ $t("marketing.navbar.blog") }}</div>
              </router-link>
            </div>
            <div class="space-y-6">
              <span class="w-full flex rounded-md shadow-sm">
                <router-link
                  to="pricing"
                  class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:border-theme-600 focus:shadow-outline-indigo active:bg-theme-600 transition ease-in-out duration-150"
                >
                  <div>{{ $t("marketing.product.getStarted") }}</div>
                </router-link>
              </span>
              <p class="text-center text-base leading-6 font-medium text-primary">
                {{ $t("marketing.navbar.existingCustomer") }}
                <router-link
                  to="login"
                  class="text-theme-600 hover:text-theme-500 transition ease-in-out duration-150"
                >
                  <div>{{ $t("marketing.navbar.signIn") }}</div>
                </router-link>
              </p>
              <span class="w-full flex rounded-md text-right">
                <flag-selector :open="true" class="w-full flex rounded-md"></flag-selector>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Selector from "@/components/shared/forms/Selector.vue";
import { mapGetters } from "vuex";
import DarkModeToggle from "./selectors/DarkModeToggle.vue";
import ColorSwitcher from "./selectors/ColorSwitcher.vue";
import FlagSelector from "./selectors/FlagSelector.vue";

@Component({
  components: {
    Selector,
    DarkModeToggle,
    ColorSwitcher,
    FlagSelector,
  },
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor",
    }),
  },
})
export default class HeaderComponent extends Vue {
  droppedDown: boolean = false;
  currentMarketingTheme: string = "";
  currentMarketingColor: string = "";
  mounted() {
    this.currentMarketingTheme = this.$store.state.theme.marketingTheme;
    this.currentMarketingColor = this.$store.state.theme.marketingColor;
  }
}
</script>

<style></style>
