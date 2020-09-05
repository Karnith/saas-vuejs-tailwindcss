<template>
  <div>
    <side-modal
      v-on:close="cancel"
      :title="
        !editing
          ? $t('shared.new') + ' ' + $t('models.' + modelName + '.object')
          : $t('shared.edit') + ' ' + $t('models.' + modelName + '.object')
      "
    >
      <template v-slot:content>
        <form @submit="save" v-if="schemaReady">
          <vue-form-generator
            :disabled="disabled"
            ref="vfg"
            :schema="schema"
            :model="model"
            :options="formOptions"
            @validated="onValidated"
          ></vue-form-generator>
        </form>
      </template>
      <template v-slot:footer>
        <span class="inline-flex rounded-md shadow-sm">
          <button
            v-if="editing"
            @click="remove"
            type="button"
            class="h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-md text-red-700 bg-red-200 hover:text-red-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >
            {{ $t("shared.delete") }}
          </button>
          <button
            @click="cancel"
            type="button"
            class="ml-1 h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >
            {{ $t("shared.cancel") }}
          </button>
          <button
            :disabled="disabled"
            @click="save"
            type="submit"
            class="ml-1 h-8 inline-flex items-center px-4 py-2 border border-theme-200 text-xs leading-5 font-medium rounded-md text-theme-700 bg-theme-100 hover:bg-theme-200 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            {{ $t("shared.save") }}
          </button>
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
import { ColumnType, ValueType } from "../../../app/models/ColumnType";
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
export default class EntityFormComponent extends BaseComponent {
  @Prop({ default: null })
  public object!: any;
  @Prop()
  public modelName!: string;
  @Prop()
  public columns!: ColumnType[];

  private model: any = null;
  private flagAllowEdit: boolean = true;
  private flagAllowDelete: boolean = true;
  private editing: boolean = false;
  private isValid: boolean = false;
  private errors!: any;
  private disabled: boolean = true;
  private schema: any = {};
  private schemaReady: boolean = false;
  private formOptions: any = {
    validateAfterLoad: false,
    validateAfterChanged: true,
  };
  mounted() {
    this.model = this.object;
    if (this.model) {
      this.editing = true;
    } else {
      this.model = {};
    }
    this.disabled = false;
    this.generateSchemaFromColumns();
  }
  generateSchemaFromColumns() {
    this.schema.fields = [];
    this.columns.forEach((column) => {
      const allowEdit = !this.editing || !column.cannotEdit;
      const field: any = {
        id: column.name,
        model: column.name,
        type: ColumnType.getFormType(column),
        inputType: ColumnType.getFormInputType(column),
        label: this.$t(`models.${this.modelName}.${column.name}`),
        placeholder: this.$t(`models.${this.modelName}.${column.name}`),
        required: !column.optional && column.valueType !== ValueType.Bool,
        values: ColumnType.getValues(column),
        disabled: !allowEdit,
        validator: "",
        files: false,
        multiple: false,
        preview: true,
        hideInput: false,
        rows: 1,
        onChange: (model, schema, event, instance) => {
          console.log("model: " + model);
          console.log("schema: " + schema);
          console.log("event: " + event);
          console.log("instance: " + instance);
        },
      };
      if (!column.valueType) {
        field.validator = "string";
      }
      if (column.valueType === ValueType.String) {
        field.validator = "string";
      } else if (column.valueType === ValueType.Number) {
        field.validator = "number";
      } else if (column.valueType === ValueType.Bool) {
        field.validator = "";
      } else if (column.valueType === ValueType.Money) {
        field.validator = "double";
      }
      if (
        column.valueType === ValueType.Number ||
        column.valueType === ValueType.PriceType ||
        column.valueType === ValueType.PriceBillingPeriod ||
        column.valueType === ValueType.ResourceFileType
      ) {
        field.default = 0;
        field.validator = "number";
      }
      if (column.valueType === ValueType.File) {
        field.files = true;
        field.multiple = false;
        field.preview = false;
        // field.hideInput = true;
      }
      if (column.valueType === ValueType.TextArea) {
        field.rows = 4;
      }

      this.schema.fields.push(field);
    });
    this.schemaReady = true;
  }
  cancel() {
    // @ts-ignore
    this.eventBus.$emit(this.modelName + "-canceled", this.model);
    // @ts-ignore
    this.$emit("canceled", this.model);
  }
  onValidated(isValid, errors) {
    // console.log("Validation result: ", isValid, ", Errors:", errors);
    this.isValid = isValid;
    this.errors = errors;
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
    if (this.editing && this.flagAllowEdit) {
      this.eventBus.$emit(this.modelName + "-saved", this.model);
      this.$emit("saved", this.model);
    } else if (!this.editing) {
      this.eventBus.$emit(this.modelName + "-added", this.model);
      this.$emit("added", this.model);
    }
  }
  remove() {
    // @ts-ignore
    this.$refs["confirm-remove"].show(this.$t("shared.remove?"));
  }
  yesRemove() {
    if (this.editing) {
      this.eventBus.$emit(this.modelName + "-deleted", this.model);
      this.$emit("deleted", this.model);
    }
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
.wrapper .combobox .form-control .mainRow {
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
