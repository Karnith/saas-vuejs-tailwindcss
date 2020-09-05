<template>
  <div>
    <span class>
      <button
        @click="adding = true"
        type="submit"
        class="mb-2 h-8 inline-flex items-center px-4 py-2 border border-theme-200 text-xs leading-5 font-medium rounded-md text-theme-700 bg-theme-100 hover:bg-theme-200 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
      >{{ $t("shared.new") + " " + $t("models.stripeFeature.object") }}</button>
    </span>
    <entity-table-list
      :modelName="modelName"
      :parentRoute="$route.path"
      routeName="features"
      :columns="columns"
      :items="items"
      :allowEdit="true"
      v-on:edit="edit"
    ></entity-table-list>
    <entity-form
      v-if="selected != null"
      :modelName="modelName"
      :object="selected"
      :columns="columns"
    ></entity-form>
    <entity-form v-if="adding" :modelName="modelName" :columns="columns"></entity-form>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import EntityTableList from "@/components/shared/entities/EntityTableList.vue";
import EntityForm from "@/components/shared/entities/EntityForm.vue";
import { ColumnType, ValueType } from "../../../app/models/ColumnType";
import { columns } from "../../../app/models/subscription/StripeFeature";

@Component({
  components: { EntityTableList, EntityForm },
})
export default class FeaturesComponent extends BaseComponent {
  modelName: string = "stripeFeature";
  columns: ColumnType[] = columns;
  selected = null as any | null;
  adding: boolean = false;
  created() {
    this.eventBus.$on(this.modelName + "-added", (data) => {
      // @ts-ignore
      this.$parent.item.features.push(data);
      this.selected = null;
      this.closeForm(true);
    });
    this.eventBus.$on(this.modelName + "-saved", (data) => {
      // @ts-ignore
      const idx = this.items.findIndex((f) => f.id === data.id);
      this.items[idx] = data;
      this.closeForm(true);
    });
    this.eventBus.$on(this.modelName + "-deleted", (data) => {
      // @ts-ignore
      this.$parent.item.features = this.items.filter((f) => f.id !== data.id);
      this.closeForm(true);
    });
    this.eventBus.$on(this.modelName + "-canceled", (data) => {
      console.log("canceled");
      this.closeForm();
    });
  }
  closeForm(hasChanges = false) {
    this.selected = null;
    this.adding = false;
    if (hasChanges) {
      // @ts-ignore
      this.$parent.hasChanges = true;
    }
  }
  edit(item: any) {
    this.selected = item;
  }
  get items() {
    // @ts-ignore
    if (this.$parent.item) {
      // @ts-ignore
      return this.$parent.item.features;
    }
  }
}
</script>
