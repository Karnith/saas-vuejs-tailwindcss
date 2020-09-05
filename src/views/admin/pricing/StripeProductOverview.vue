<template>
  <div v-if="product" class="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Product</h3>
        <p
          class="mt-1 text-sm leading-5 text-gray-500"
        >Update the product, prices, features and more</p>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-3 sm:col-span-3" v-for="(column,idx) in columns" :key="idx">
              <label
                :for="column.name"
                class="block text-sm font-medium leading-5 text-gray-700"
              >{{$t("models.stripeProduct." + column.name)}}</label>
              <div v-if="column.name === 'image'">
                <img :src="product[column.name]" class="h-18" />
              </div>
              <input
                v-else
                v-model="product[column.name]"
                :disabled="true"
                :id="column.name"
                class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import ObjectList from "../../../components/shared/forms/ObjectList.vue";
import { report } from "process";
import TableRowSkeleton from "@/components/shared/skeletons/TableRowSkeleton.vue";
import { StripeProduct } from "../../../app/models/subscription/StripeProduct";
import Modal from "../../../components/shared/modals/Modal.vue";
import Products from "../../../components/marketing/pricing/Products.vue";

@Component({
  components: { Products, ObjectList, TableRowSkeleton, Modal },
})
export default class StripeProductOverviewComponent extends BaseComponent {
  columns = [
    { name: "stripeId", type: typeof String },
    { name: "title", type: typeof String },
    { name: "description", type: typeof String },
    { name: "badge", type: typeof String },
    { name: "active", type: typeof Number },
    { name: "image", type: typeof Image },
  ];
  get product() {
    // @ts-ignore
    return this.$parent.product;
  }
}
</script>
