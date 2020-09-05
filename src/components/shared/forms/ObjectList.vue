<template>
  <div>
    <div>
      <div
        class="flex items-center justify-between bg-white -m-4 sm:-m-8 p-8 pb-4 shadow-lg mb-4"
      >
        <div class="flex-1 min-w-0">
          <h2
            class="flex text-2xl font-bold text-gray-800 sm:text-3xl leading-9 sm:truncate"
          >
            {{ title }}
          </h2>
        </div>
        <div class="mt-0 flex lg:mt-0 lg:ml-4">
          <slot name="extraButtons" />

          <span
            class="hidden sm:block shadow-sm rounded-md"
            v-if="allowDownload"
          >
            <json-excel
              :data="$parent.items"
              :name="title + '.xls'"
              :before-generate="startDownload"
              type="csv"
            >
              <button
                type="button"
                class="h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 transition duration-150 ease-in-out"
              >
                <i
                  class="fa fa-file-excel -ml-1 mr-2 h-5 w-5 text-gray-500"
                ></i>
                {{ $t("shared.download") }}
              </button>
            </json-excel>
          </span>

          <span class="hidden sm:block ml-3 shadow-sm rounded-md">
            <button
              @click="reload"
              type="button"
              class="h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
            >
              <i class="fa fa-redo -ml-1 mr-2 h-5 w-5 text-gray-500"></i>
              {{ $t("shared.reload") }}
            </button>
          </span>
          <span class="sm:ml-3 shadow-sm rounded-md">
            <router-link
              :to="routeNew"
              class="h-8 inline-flex items-center px-4 py-2 border border-theme-200 text-xs leading-5 font-medium rounded-md text-theme-700 bg-theme-100 hover:bg-theme-200 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              <i class="fa fa-plus -ml-1 mr-2 h-5 w-5 text-theme-700"></i>
              {{ $t("shared.new") }}
            </router-link>
          </span>
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-0 sm:mt-8 ">
      <div class="mt-4 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <slot name="table" />
      </div>
    </div>
    <router-view></router-view>
    <error-modal ref="error-modal"></error-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseComponent from "../BaseComponent.vue";
import { Prop } from "vue-property-decorator";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import JsonExcel from "vue-json-excel/JsonExcel.vue";

@Component({
  components: { JsonExcel, ErrorModal },
})
export default class ObjectList extends BaseComponent {
  @Prop() title!: string;
  @Prop() routeNew!: string;
  @Prop({ default: true }) allowDownload!: boolean;

  reload() {
    this.$emit("reload");
  }
  startDownload() {
    // @ts-ignore
    if (!this.$parent.items || this.$parent.items.length === 0) {
      // @ts-ignore
      this.$refs["error-modal"].show(this.$t("shared.noRecords"));
    }
  }
}
</script>
