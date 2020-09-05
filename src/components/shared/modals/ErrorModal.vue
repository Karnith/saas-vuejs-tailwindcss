<template>
  <div>
    <div v-if="showing">
      <div
        class="z-40 fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          class="bg-secondary rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 border border-red-300"
            >
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-primary" id="modal-headline">{{ title }}</h3>
              <div class="mt-2">
                <p class="text-sm leading-5 text-gray-500">{{ errorDescription }}</p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <span class="flex w-full rounded-md shadow-sm">
              <button
                ref="close"
                v-on:click="showing = false"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-theme-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-theme-800 focus:outline-none focus:bg-theme-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >{{ closeText }}</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { JsonHubProtocol } from "@aspnet/signalr";

@Component
export default class ErrorModalComponent extends Vue {
  private title!: string;
  private closeText!: any;
  private showing: boolean = false;
  private errorDescription!: string;
  mounted() {
    this.title = this.$t("shared.error").toString();
    this.closeText = this.$t("shared.close").toString();
  }
  public show(error: string) {
    if (error.length > 300 && process.env.NODE_ENV !== "production") {
      error = error.substring(0, 300);
    }

    this.errorDescription = error;
    this.showing = true;
    // @ts-ignore
    // this.$refs["close"].focus();
  }
}
</script>
