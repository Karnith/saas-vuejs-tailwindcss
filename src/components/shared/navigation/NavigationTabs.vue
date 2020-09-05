<template>
  <div>
    <div class="-mx-2">
      <div class="sm:hidden p-4 rounded-md -mx-0 mt-1 bg-white shadow-md">
        <select
          aria-label="Selected tab"
          class="form-select block w-full h-6 bg-transparent"
          @change="onChange"
          v-model="$route.name"
        >
          <option v-for="(route, idx) in route.children" :key="idx" :value="route.name">
            <div v-if="route.meta">{{ route.meta.title }}</div>
            <div v-else>{{ $t("shared.undefined") }}</div>
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="flex">
          <router-link
            v-for="(route, idx) in route.children"
            :key="idx"
            :to="{ name: route.name }"
            :ref="route.name"
            class="px-3 py-2 font-medium text-sm leading-5 rounded-md hover:text-gray-700"
            :class="
              $route.name === route.name
                ? 'outline-none text-theme-700 bg-theme-100 border border-theme-200'
                : 'text-gray-500 hover:text-gray-700'
            "
          >
            <div v-if="route.meta">{{ route.meta.title }}</div>
            <div v-else>{{ $t("shared.undefined") }}</div>
          </router-link>
        </nav>
      </div>
    </div>
    <div class="block">
      <div class="my-3">
        <div class="border-t border-gray-200"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import { Prop, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

@Component({
  components: {},
})
export default class NavigationTabsComponent extends BaseComponent {
  @Prop()
  route: any;
  onChange(event) {
    this.$router.push({ name: event.target.value });
  }
}
</script>
