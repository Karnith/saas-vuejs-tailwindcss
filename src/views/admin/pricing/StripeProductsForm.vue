<template>
  <div>
    <side-modal
      v-on:close="cancel"
      :title="
        !editing
          ? $t('shared.new') + ' ' + $t('models.stripeProduct.object')
          : $t('shared.edit') + ' ' + $t('models.stripeProduct.object')
      "
    >
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
import { StripeProduct } from "../../../app/models/subscription/StripeProduct";
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
export default class StripeProductFormComponent extends BaseComponent {
  private uuid: any = false;

  private flagAllowEdit: boolean = true;
  private flagAllowDelete: boolean = true;
  private editing: boolean = false;
  private isValid: boolean = false;
  private model = {} as StripeProduct;
  private disabled: boolean = true;
  private updateOnServer: boolean = true;
  private schema: any = {
    fields: [
      {
        id: "title",
        type: "input",
        inputType: "text",
        model: "title",
        label: this.$t("models.stripeProduct.title"),
        placeholder: this.$t("models.stripeProduct.title"),
        required: true,
        validator: validators.string,
      },
      {
        id: "description",
        type: "input",
        inputType: "text",
        model: "description",
        label: this.$t("models.stripeProduct.description"),
        placeholder: this.$t("models.stripeProduct.description"),
        required: false,
        validator: validators.string,
      },
      {
        id: "stripeId",
        type: "input",
        inputType: "text",
        label: this.$t("models.stripeProduct.stripeId"),
        placeholder: this.$t("models.stripeProduct.stripeIdLeaveEmpty"),
        model: "stripeId",
        required: false,
        attributes: {
          autofocus: true,
        },
        validator: validators.string,
      },
      {
        id: "tier",
        inputType: "number",
        type: "input",
        model: "tier",
        label: this.$t("models.stripeProduct.tier"),
        placeholder: this.$t("models.stripeProduct.tier"),
        required: true,
        validator: validators.integer,
      },
      {
        id: "badge",
        type: "input",
        inputType: "text",
        model: "badge",
        label: this.$t("models.stripeProduct.badge"),
        placeholder: this.$t("models.stripeProduct.badge"),
        required: false,
        validator: validators.string,
      },
      {
        id: "active",
        type: "checkbox",
        model: "active",
        label: this.$t("models.stripeProduct.active"),
        required: true,
      },
      {
        id: "image",
        type: "image",
        model: "image",
        label: this.$t("models.stripeProduct.image"),
        placeholder: this.$t("models.stripeProduct.image"),
        hideInput: true,
      },
      {
        id: "maxUsers",
        inputType: "number",
        type: "input",
        model: "maxUsers",
        label: this.$t("models.stripeProduct.maxUsers"),
        placeholder: this.$t("models.stripeProduct.maxUsers"),
        default: 0,
      },
    ],
  };
  private formOptions: any = {
    validateAfterLoad: false,
    validateAfterChanged: true,
    validateAsync: true,
  };
  mounted() {
    if (this.$route.params.uuid) {
      this.disabled = true;
      this.uuid = this.$route.params.uuid;
      this.editing = true;

      this.schema.fields[2].disabled = true;
      this.services.stripe
        .getProduct(this.uuid)
        .then((response: any) => {
          this.model = response.data;
          this.disabled = false;
        })
        .catch((error) => {
          // @ts-ignore
          this.$refs["error-modal"].show(this.$t("shared.notFound"));
          this.pushToParent();
        });
    } else {
      this.disabled = false;
    }
  }
  cancel() {
    this.eventBus.$emit("stripeProduct-canceled");
    this.pushToParent();
  }
  save() {
    // @ts-ignore
    this.$refs.vfg.validate().then((errors) => {
      if (errors && errors.length > 0) {
        // @ts-ignore
        this.$refs["error-modal"].show(this.$t("shared.invalidForm"));
      } else {
        // @ts-ignore
        this.$refs["confirm-save"].show(
          this.editing ? this.$t("shared.save?") : this.$t("shared.add?")
        );
      }
    });
  }
  yesSave() {
    if (this.editing && this.flagAllowEdit) {
      if (this.updateOnServer) {
        this.services.stripeAdmin
          .syncProduct(true, this.model)
          .then((response) => {
            this.eventBus.$emit("stripeProduct-saved", this.model);
            this.pushToParent();
          })
          .catch((error) => {
            // @ts-ignore
            this.$refs["error-modal"].show(error);
          });
      } else {
        this.eventBus.$emit("stripeProduct-saved", this.model);
        this.pushToParent();
      }
    } else if (!this.editing) {
      if (this.updateOnServer) {
        this.services.stripeAdmin
          .syncProduct(true, this.model)
          .then((response: any) => {
            this.eventBus.$emit("stripeProduct-added", response.data);
            this.pushToParent();
          })
          .catch((error) => {
            // @ts-ignore
            this.$refs["error-modal"].show(error);
          });
      } else {
        this.eventBus.$emit("stripeProduct-added", this.model);
        this.pushToParent();
      }
    }
  }
  remove() {
    // @ts-ignore
    this.$refs["confirm-remove"].show(this.$t("shared.remove?"));
  }
  yesRemove() {
    if (this.editing) {
      if (this.updateOnServer) {
        this.services.stripeAdmin
          .deleteProduct(true, this.model.uuid)
          .then((response) => {
            this.eventBus.$emit("stripeProduct-deleted", this.model);
          });
      } else {
        this.eventBus.$emit("stripeProduct-deleted", this.model);
      }
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
</style>
