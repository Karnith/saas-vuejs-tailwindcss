<template>
  <div>
    <div v-for="(_state, index) in $store.state" :key="index">
      <!-- <VueObjectView v-model="$store.state[index]" /> -->
    </div>
    <!-- <button
      type="button"
      class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150"
      @click="reset"
    >
      {{ $t("shared.reset") }}
    </button>-->
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
// import VueObjectView from "vue-object-view";

@Component({
  components: {
    SuccessModal,
    ErrorModal,
    ConfirmModal,
    // VueObjectView,
  },
})
export default class StoreComponent extends BaseComponent {}
</script>
