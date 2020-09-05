<template>
  <div>
    <div
      class="flex items-center justify-between bg-white -m-4 sm:-m-8 p-8 pb-4 shadow-lg mb-4"
    >
      <div class="flex-1 min-w-0">
        <h2
          class="flex text-2xl font-bold leading-9 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate"
        >
          {{ $t("settings.profile.roles.Member") }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../components/shared/BaseComponent.vue";
@Component({
  components: {},
})
export default class PermissionsIndexComponent extends BaseComponent {}
</script>
