<template>
  <div>
    <div v-for="(tenant, index) in tenants" :key="index">
      <a @click="selectTenant(tenant)">{{ tenant.name }}</a>
    </div>
    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";

@Component({
  components: { SuccessModal, ErrorModal },
})
export default class SelectOrganizationComponent extends BaseComponent {
  mounted() {
    this.services.tenants
      .getMyTenants()
      .then((response: any) => {
        if (response.data.length > 0) {
          if (response.data.length === 1) {
            this.selectTenant(response.data[0]);
          }
        }
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  selectTenant(tenant) {
    this.$store.commit("tenant/current", tenant);
    this.$router.push("/app");
  }
  get tenants() {
    return this.$store.state.tenant.tenants;
  }
}
</script>
