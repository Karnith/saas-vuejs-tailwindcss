<template>
  <div>
    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";

@Component({
  components: { SuccessModal, ErrorModal },
})
export default class LogoutTemplate extends BaseComponent {
  mounted() {
    console.log("Logout mounted");
    // this.$store.dispatch("auth/logout");
  }
}
</script>
