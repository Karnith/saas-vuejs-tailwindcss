<template>
  <div>
    <!-- <div
      class="lg:flex lg:items-center lg:justify-between bg-white -m-4 sm:-m-8 p-8 pb-4 pt-8 sm:pt-6 shadow-lg mb-4"
    >
       <div class="flex-1 min-w-0">
        <h2
          class="flex text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate"
        >
          {{ $t("app.navbar.tenant") }}
        </h2>
      </div>
       <div class="mt-5 flex lg:mt-0 lg:ml-4">
        <slot name="buttons"></slot>
      </div>
    </div>-->
    <!-- <navigation-tabs v-if="route" :route="route"></navigation-tabs> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import NavigationTabs from "@/components/shared/navigation/NavigationTabs.vue";
import PageTitle from "@/components/shared/navigation/PageTitle.vue";
import { adminRoutes } from "../../../../router/adminRoutes";

@Component({
  components: {
    NavigationTabs,
    PageTitle,
  },
})
export default class TenantComponent extends BaseComponent {
  private route: object = {};
  mounted() {
    this.route = adminRoutes;
  }
}
</script>
