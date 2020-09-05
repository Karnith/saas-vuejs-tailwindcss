<template>
  <div>
    <Header></Header>
    <section class="text-primary body-font overflow-hidden">
      <div class="container px-5 py-5 mx-auto">
        <div v-if="loading">
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
        </div>
        <div v-else>
          <products></products>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import Header from "@/components/marketing/Header.vue";
import Products from "../../components/marketing/pricing/Products.vue";
import TableRowSkeleton from "@/components/shared/skeletons/TableRowSkeleton.vue";
import { StripeProduct } from "../../app/models/subscription/StripeProduct";

@Component({
  components: {
    Header,
    Products,
    TableRowSkeleton,
  },
})
export default class PricingComponent extends BaseComponent {}
</script>
