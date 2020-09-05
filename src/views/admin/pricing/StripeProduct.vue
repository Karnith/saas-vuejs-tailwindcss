<template>
  <div>
    <div v-if="loading">{{ $t("shared.loading") }}</div>
    <div v-else>
      <div v-if="item && item.uuid">
        <page-title>
          <template v-slot:title>{{ item.title }}</template>
          <template v-slot:buttons>
            <span class="sm:ml-3 shadow-sm rounded-md">
              <router-link
                :to="'/admin/products/' + item.uuid + '/edit'"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                >{{ $t("shared.edit") }}</router-link
              >
              <button
                v-if="hasChanges"
                @click="reload"
                class="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-yellow-100 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
              >
                {{ $t("shared.cancel") }}
              </button>
              <button
                v-if="hasChanges"
                @click="saveChanges"
                class="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-yellow-100 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
              >
                {{ $t("shared.saveChanges") }}
              </button>
            </span>
          </template>
        </page-title>

        <div class="hidden sm:block mb-3 mt-4 sm:mt-12">
          <nav class="flex">
            <!-- <router-link
              :to="{name: 'admin.product.overview', params: item.uuid}"
              class="px-3 py-2 font-medium text-sm leading-5 rounded-md hover:text-gray-700"
              :class="
              $route.name === 'admin.product.overview'
                ? 'outline-none text-theme-700 bg-theme-100 border border-theme-200'
                : 'text-gray-500 hover:text-gray-700'
            "
            >{{$t("models.stripeProduct.object")}}</router-link>-->
            <router-link
              :to="{ name: 'admin.product.prices', params: item.uuid }"
              class="px-3 py-2 font-medium text-sm leading-5 rounded-md hover:text-gray-700"
              :class="
                $route.name === 'admin.product.prices'
                  ? 'outline-none text-theme-700 bg-theme-100 border border-theme-200'
                  : 'text-gray-500 hover:text-gray-700'
              "
              >{{ $t("models.stripePrice.plural") }}</router-link
            >
            <router-link
              :to="{ name: 'admin.product.features', params: item.uuid }"
              name="admin.product.features"
              class="px-3 py-2 font-medium text-sm leading-5 rounded-md hover:text-gray-700"
              :class="
                $route.name === 'admin.product.features'
                  ? 'outline-none text-theme-700 bg-theme-100 border border-theme-200'
                  : 'text-gray-500 hover:text-gray-700'
              "
              >{{ $t("models.stripeFeature.plural") }}</router-link
            >
          </nav>
        </div>
      </div>
      <div v-else>{{ $t("shared.notFound") }}</div>
    </div>

    <div
      v-if="product"
      class="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-4"
    >
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            {{ $t("models.stripeProduct.object") }}
          </h3>
          <p class="mt-1 text-sm leading-5 text-gray-500">
            {{ $t("models.stripeProduct.description") }}
          </p>
          <p>
            <img v-if="hasImage()" :src="getImage()" class="h-32 mt-4" />
          </p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="grid grid-cols-6 gap-6">
              <div
                class="col-span-6 md:col-span-6 lg:col-span-2"
                v-for="(column, idx) in columns"
                :key="idx"
              >
                <div v-if="column.name === 'image'">
                  <!-- <img :src="product[column.name]" class="h-16" /> -->
                </div>
                <div v-else>
                  <label
                    :for="column.name"
                    class="block text-sm font-medium leading-5 text-gray-700"
                    >{{ $t("models.stripeProduct." + column.name) }}</label
                  >
                  <input
                    :type="isBool(column) ? 'checkbox' : ''"
                    v-model="product[column.name]"
                    :disabled="true"
                    :id="column.name"
                    class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <router-view></router-view>

    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
    <!-- <confirm-modal ref="confirm-modal" v-on:yes="yes"></confirm-modal> -->
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import { StripeProduct } from "../../../app/models/subscription/StripeProduct";
import PageTitle from "../../../components/shared/navigation/PageTitle.vue";
import { adminRoutes } from "../../../router/adminRoutes";
import { Watch } from "vue-property-decorator";
import { ColumnType, ValueType } from "../../../app/models/ColumnType";

@Component({
  components: {
    SuccessModal,
    ErrorModal,
    ConfirmModal,
    PageTitle,
  },
})
export default class StripeProductComponent extends BaseComponent {
  public product = {} as StripeProduct;
  public hasChanges: boolean = false;

  columns: ColumnType[] = [
    { name: "stripeId" },
    { name: "title" },
    { name: "description" },
    { name: "tier", valueType: ValueType.Number },
    { name: "badge", valueType: ValueType.String },
    { name: "active", valueType: ValueType.Bool },
    { name: "maxUsers", valueType: ValueType.Number },
    { name: "image", valueType: ValueType.Image },
  ];
  created() {
    const self = this;
    this.services.stripe.getProducts(true, false);
    this.eventBus.$on("stripeProduct-deleted", (data) => self.deleted(data));
    this.eventBus.$on("stripeProduct-saved", (data) => {
      this.reload();
    });
    this.eventBus.$on("stripeProduct-added", (data) => {
      this.reload();
    });
  }
  deleted(data: StripeProduct) {
    this.pushToParent();
  }
  @Watch("$route.params.uuid")
  productChanged(val: string, oldVal: string) {
    this.reload();
  }
  mounted() {
    this.reload();
    // this.$router.push({ name: "admin.product.overview" });
  }
  async reload() {
    this.loading = true;
    this.hasChanges = false;
    this.services.stripe
      .getProduct(this.$route.params.uuid)
      .then((response: any) => {
        this.product = response.data;
      })
      .finally(() => {
        this.loading = false;
      });
  }
  saveChanges() {
    this.services.stripeAdmin
      .syncProduct(true, this.product)
      .then((response) => {
        this.reload();
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  isBool(column: ColumnType) {
    return column.valueType === ValueType.Bool;
  }
  hasImage() {
    return this.columns.includes(
      (element: ColumnType) => element.valueType === ValueType.Image
    );
  }
  getImage() {
    return this.product.image;
  }
  get item() {
    return this.product;
  }
  //   get columns() {
  //     let modelColumns: ColumnType[] = [];
  //     Object.keys(this.product).forEach((key) => {
  //       modelColumns.push({
  //         name: key,
  //       });
  //     });
  //     return modelColumns;
  //   }
}
</script>
