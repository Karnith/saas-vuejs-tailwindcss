<template>
  <div>
    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
    <div
      ref="loading-screen"
      v-if="loading"
      id="loading-screen"
      class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50"
    >
      <span
        class="text-theme-300 opacity-75 mx-auto mt-64 block relative w-0 h-0 pr-8"
      >
        <i class="fas fa-circle-notch fa-spin fa-2x"></i>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import LoadingButton from "@/components/shared/buttons/LoadingButton.vue";
import services from "../../services";

import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";

import { EventBus } from "../../plugins/event-bus";
import formatMoney from "../../plugins/helpers";

import TableRowSkeleton from "@/components/shared/skeletons/TableRowSkeleton.vue";

@Component({
  components: {
    ErrorModal,
    SuccessModal,
    ConfirmModal,
    LoadingButton,
    TableRowSkeleton,
  },
})
export default class BaseComponent extends Vue {
  public loading: boolean = false;
  public services = services;
  public eventBus = EventBus;
  public pushToParent() {
    const pathArray = this.$route.path.split("/");
    if (pathArray[pathArray.length - 1] === "") {
      pathArray.pop();
    }
    const routes: string[] = [];
    for (let index = 0; index < pathArray.length - 1; index++) {
      const element: string = pathArray[index];
      routes.push(element);
    }
    const parentRoute = routes.join("/");
    console.log("pushing; " + parentRoute);
    this.$router.push(parentRoute);
  }
  public formatMoney(toFormat: number) {
    formatMoney(toFormat);
  }
  public showLoading() {
    this.loading = true;
  }
  public hideLoading() {
    this.loading = false;
  }
}
</script>
