<template>
  <div>
    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
    <!-- <confirm-modal ref="confirm-modal" v-on:yes="yes"></confirm-modal> -->
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";

@Component({
  components: { SuccessModal, ErrorModal, ConfirmModal },
})
export default class TemplateComponent extends BaseComponent {}
</script>
