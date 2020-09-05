<template>
  <div>
    <router-view></router-view>
    <h3
      class="text-lg leading-6 font-medium text-theme-900 mb-4"
    >Subscription: {{activeProduct ? activeProduct.title : ""}}</h3>
    <h3 class="text-lg leading-6 font-medium text-theme-900 mb-4">Role: {{roleName}}</h3>
    <div>
      <demo-actions></demo-actions>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import DemoActions from "../../../components/app/subscriptions/DemoActions.vue";
import { mapGetters } from "vuex";
import { StripeProduct } from "../../../app/models/subscription/StripeProduct";
@Component({
  components: { DemoActions },
  computed: {
    ...mapGetters("tenant", {
      activeProduct: "activeProduct",
    }),
    ...mapGetters("tenant", {
      roleName: "roleName",
    }),
  },
})
export default class PermissionsIndexComponent extends BaseComponent {}
</script>
