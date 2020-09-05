<template>
  <div v-on:keypress.esc="close">
    <div
      class="absolute inset-0 bg-gray-100 bg-opacity-25 transition-opacity"
    ></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <!--
        Slide-over panel, show/hide based on slide-over state.

        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0"
          To: "translate-x-full"
          -->
          <div class="w-screen max-w-xs md:max-w-md">
            <div
              class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-2xl"
            >
              <div class="h-0 flex-1 py-6 space-y-6 overflow-y-scroll">
                <header class="px-4 sm:px-6">
                  <div class="flex items-start justify-between space-x-3">
                    <h2 class="text-lg leading-7 font-medium text-gray-900">
                      {{ title }}
                    </h2>
                    <div class="h-7 flex items-center">
                      <button
                        @click="close"
                        aria-label="Close panel"
                        class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                      >
                        <svg
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
                      </button>
                    </div>
                  </div>
                </header>
                <div class="relative flex-1 px-4 sm:px-6">
                  <!-- Replace with your content -->
                  <slot name="content"></slot>
                  <div
                    class="flex-shrink-0 px-1 py-4 space-x-4 flex justify-end border-t border-gray-200"
                  >
                    <slot name="footer"></slot>
                  </div>
                  <!-- /End replace -->
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import { Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class SideModal extends BaseComponent {
  @Prop()
  title!: string;

  close() {
    this.$emit("close");
  }
}
</script>
