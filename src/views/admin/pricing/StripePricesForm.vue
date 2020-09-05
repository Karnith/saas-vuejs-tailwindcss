<template>
  <div></div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import EntityForm from "@/components/shared/entities/EntityForm.vue";
import { ColumnType } from "../../../app/models/ColumnType";
import {
  columns,
  StripePrice,
} from "../../../app/models/subscription/StripePrice";

@Component({
  components: { EntityForm },
})
export default class PricesComponent extends BaseComponent {
  uuid!: string;
  columns: ColumnType[] = columns;
  mounted() {
    this.uuid = this.$route.params.uuid;
  }
  get() {
    return this.services.stripe.getPrice(this.uuid);
  }
  post(model: StripePrice) {
    return model;
  }
  put(model: StripePrice) {
    return model;
  }
  delete() {
    return true;
  }
}
</script>
