<template>
  <div>
    <side-modal v-on:close="cancel" :title="!editing ? 'New expense' : 'Edit expense'">
      <template v-slot:content>
        <form @submit="save">
          <vue-form-generator
            :disabled="disabled"
            ref="vfg"
            :schema="schema"
            :model="model"
            :options="formOptions"
          ></vue-form-generator>
        </form>
        <!-- {{ JSON.stringify(model) }} -->
      </template>
      <template v-slot:footer>
        <span class="inline-flex rounded-md shadow-sm">
          <button
            v-if="editing"
            @click="remove"
            type="button"
            class="h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-md text-red-700 bg-red-200 hover:text-red-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >{{ $t("shared.delete") }}</button>
          <button
            @click="cancel"
            type="button"
            class="ml-1 h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >{{ $t("shared.cancel") }}</button>
          <button
            :disabled="disabled"
            @click="save"
            type="submit"
            class="ml-1 h-8 inline-flex items-center px-4 py-2 border border-theme-200 text-xs leading-5 font-medium rounded-md text-theme-700 bg-theme-100 hover:bg-theme-200 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
          >{{ $t("shared.save") }}</button>
        </span>
      </template>
    </side-modal>
    <error-modal ref="error-modal"></error-modal>
    <confirm-modal ref="confirm-save" v-on:yes="yesSave"></confirm-modal>
    <confirm-modal ref="confirm-remove" v-on:yes="yesRemove"></confirm-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import SideModal from "@/components/shared/modals/SideModal.vue";
import VueFormGenerator, { validators } from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import { Prop } from "vue-property-decorator";
import dateInput from "@/components/shared/forms/DateInput.vue";
import { Expense } from "../../../app/models/core/Expense";
Vue.component("fieldDateInput", dateInput);

@Component({
  components: {
    SuccessModal,
    ErrorModal,
    ConfirmModal,
    SideModal,
    "vue-form-generator": VueFormGenerator.component,
  },
})
export default class ExpensesForm extends BaseComponent {
  private editing: boolean = false;
  private isValid: boolean = false;
  private id: any = false;
  private model = {} as Expense;
  private disabled: boolean = true;
  private categories: any = [];
  private schema: any = {
    fields: [
      {
        id: "description",
        type: "input",
        inputType: "text",
        label: "Description",
        model: "description",
        placeholder: "Product description",
        required: true,
        attributes: {
          autofocus: true,
        },
        validator: validators.string,
      },
      {
        id: "quantity",
        inputType: "number",
        type: "input",
        model: "quantity",
        label: "Quantity",
        placeholder: "Quantity",
        required: true,
        validator: validators.integer,
      },
      {
        id: "price",
        inputType: "number",
        type: "input",
        model: "price",
        label: "Price",
        placeholder: "Price",
        required: true,
        validator: validators.double,
      },
      {
        id: "category",
        type: "select",
        label: "Category",
        model: "category",
        placeholder: "Category",
        values: [],
      },
      {
        id: "date",
        type: "dateInput",
        label: "Date",
        model: "date",
        required: true,
        validator: validators.date,
      },
      {
        id: "image",
        type: "image",
        label: "Image",
        model: "image",
        hideInput: true,
      },
    ],
  };
  private formOptions: any = {
    validateAfterLoad: false,
    validateAfterChanged: true,
  };
  mounted() {
    this.loadCategories();
    if (this.$route.params.id) {
      this.disabled = true;
      this.id = this.$route.params.id;
      this.editing = true;
      this.services.expenses
        .get(this.id)
        .then((response: any) => {
          this.model = response.data;
          this.disabled = false;
        })
        .catch((error) => {
          // // @ts-ignore
          // this.$refs["error-modal"].show(this.$t("shared.notFound"));
          this.$router.push("/app/expenses");
        });
    } else {
      this.disabled = false;
    }
  }
  cancel() {
    this.eventBus.$emit("expense-canceled");
    this.$router.push("/app/expenses");
  }
  save() {
    // @ts-ignore
    if (this.$refs.vfg.validate()) {
      // @ts-ignore
      this.$refs["confirm-save"].show(
        this.editing ? this.$t("shared.save?") : this.$t("shared.add?")
      );
    } else {
      // @ts-ignore
      this.$refs["error-modal"].show(this.$t("shared.invalidForm"));
    }
  }
  yesSave() {
    if (this.editing) {
      this.services.expenses
        .put(this.model.id, this.model)
        .then((response) => {
          this.eventBus.$emit("expense-saved", this.model);
          this.$router.push("/app/expenses");
        })
        .catch((error) => {
          // @ts-ignore
          this.$refs["error-modal"].show(error);
        });
    } else {
      this.services.expenses
        .post(this.model)
        .then((response: any) => {
          this.eventBus.$emit("expense-added", response.data);
          this.$router.push("/app/expenses");
        })
        .catch((error) => {
          // @ts-ignore
          this.$refs["error-modal"].show(error);
        });
    }
  }
  remove() {
    // @ts-ignore
    this.$refs["confirm-remove"].show(this.$t("shared.remove?"));
  }
  yesRemove() {
    if (this.editing) {
      this.services.expenses.delete(this.model.id).then((response) => {
        this.eventBus.$emit("expense-deleted", this.model);
        this.$router.push("/app/expenses");
      });
    }
  }
  get getCategories() {
    return this.categories;
  }
  loadCategories() {
    this.categories = [];
    this.services.transactionCategories.get().then((response: any) => {
      response.data.forEach((element) => {
        this.categories.push({
          id: element.id,
          name: element.name,
        });
        this.schema.fields[3].values = this.categories;
        if (this.categories.length === 0) {
          this.schema.fields[3].type = "input";
          this.schema.fields[3].inputType = "text";
        }
      });
    });

    // return [
    //   { id: "en-GB", name: "English (GB)" },
    //   { id: "en-US", name: "English (US)" },
    //   { id: "de", name: "German" },
    //   { id: "it", name: "Italic" },
    //   { id: "fr", name: "French" },
    // ];
  }
}
</script>
<style>
.form-control {
  @apply w-full;
  @apply border;
  @apply border-gray-400;
  @apply shadow-sm;
  @apply rounded;
  @apply leading-5;
  @apply text-sm;
  @apply h-8;
  @apply p-3;
}
.wrapper .file {
  @apply h-10;
}
.vdp-datepicker div input {
  @apply w-full;
  @apply border;
  @apply border-gray-400;
  @apply shadow-sm;
  @apply rounded;
  @apply leading-5;
  @apply text-sm;
  @apply h-8;
  @apply p-3;
}
</style>
