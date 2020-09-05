<template>
  <div>
    <main class="mt-8 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-20 xl:mt-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        <div class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
          <div
            class="text-sm font-semibold uppercase tracking-wide text-secondary sm:text-base lg:text-sm xl:text-base"
          >{{$t("marketing.product.pre-headline")}}</div>
          <h2
            class="mt-1 text-4xl tracking-tight leading-10 font-extrabold text-primary sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl"
          >
            {{$t("marketing.product.headline1")}}
            <br class="hidden md:inline" />
            <span class="text-theme-600">{{$t("marketing.product.headline2")}}</span>
          </h2>
          <p
            class="mt-3 text-base text-secondary sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
          >{{$t("marketing.product.subheadline")}}</p>
          <div class="mt-5 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
            <p class="text-base font-medium text-primary">{{$t("marketing.product.getStarted")}}</p>
            <form action="#" method="POST" class="mt-3 sm:flex">
              <input
                v-model="email"
                aria-label="Email"
                class="appearance-none block w-full px-3 py-3 border border-gray-300 text-base leading-6 rounded-md placeholder-gray-500 shadow-sm focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:flex-1"
                v-bind:placeholder="$t('marketing.newsletter.email')"
              />
              <button
                @click="register"
                to="pricing"
                type="submit"
                class="mt-3 w-full px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:border-theme-900 focus:shadow-outline-gray active:bg-theme-900 transition duration-150 ease-in-out sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
              >{{$t("marketing.product.getStarted")}}</button>
            </form>
            <p
              class="mt-3 text-sm leading-5 text-secondary"
            >{{$t("marketing.pricing.noCreditCardRequired")}}.</p>
          </div>
        </div>
        <div
          class="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
        >
          <div class="relative mx-auto w-full rounded-lg lg:max-w-md">
            <div
              class="relative block w-full rounded-lg overflow-hidden focus:outline-none focus:shadow-outline"
            >
              <img
                v-if="$store.state.theme.marketingTheme==='theme-bg-light'"
                class="w-full"
                src="@/assets/img/cover-light.png"
                alt="logo"
              />
              <img v-else class="w-full" src="@/assets/img/cover-dark.png" alt="logo" />
              <div class="absolute inset-0 w-full h-full flex items-center justify-center">
                <svg
                  v-if="false"
                  class="h-20 w-20 text-theme-500"
                  fill="currentColor"
                  viewBox="0 0 84 84"
                >
                  <circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
                  <path
                    d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VueTyper } from "vue-typer";
import Component from "vue-class-component";

@Component({ components: { VueTyper } })
export default class HeroComponent extends Vue {
  email: string = "";
  register() {
    this.$router.push({ path: "pricing?e=" + this.email });
  }
}
</script>
<style lan scoped>
.vue-typer .custom.char.typed {
  color: #009688;
}
</style>
