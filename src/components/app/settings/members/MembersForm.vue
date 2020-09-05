<template>
  <div>
    <side-modal
      v-on:close="cancel"
      :title="!editing ? 'New user' : 'Edit user'"
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
        <!-- {{ JSON.stringify(model) }} -->
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
    <confirm-modal
      ref="confirm-upgrade"
      v-on:yes="yesUpdateSubscription"
      v-on:no="noUpdateSubscription"
    ></confirm-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseComponent from "../../../../components/shared/BaseComponent.vue";
import SideModal from "@/components/shared/modals/SideModal.vue";
import VueFormGenerator, { validators } from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import { Prop } from "vue-property-decorator";
import dateInput from "@/components/shared/forms/DateInput.vue";
import {
  TenantUserRole,
  ITenantUserDTO,
} from "../../../../app/models/system/account/ITenantDTO";
import { mapGetters } from "vuex";
import { StripeProduct } from "../../../../app/models/subscription/StripeProduct";
Vue.component("fieldDateInput", dateInput);

@Component({
  components: {
    SideModal,
    "vue-form-generator": VueFormGenerator.component,
  },
  computed: {
    ...mapGetters("tenant", {
      activeProduct: "activeProduct",
      memberCount: "memberCount",
      role: "role",
      isOwnerOrAdmin: "isOwnerOrAdmin",
    }),
  },
})
export default class MembersForm extends BaseComponent {
  @Prop()
  public propTenantApiKey!: string;
  public tenantApiKey: string = "";
  private editing: boolean = false;
  private isValid: boolean = false;
  private id: any = false;
  private model = {} as ITenantUserDTO;
  private disabled: boolean = true;
  private schema: any = {
    fields: [
      {
        id: "email",
        type: "input",
        inputType: "text",
        label: this.$t("account.shared.email"),
        model: "email",
        required: true,
        placeholder: this.$t("account.shared.email"),
        disabled: this.$route.params.id,
        validator: validators.email,
      },
      {
        id: "firstName",
        type: "input",
        inputType: "text",
        label: this.$t("settings.profile.firstName"),
        model: "firstName",
        required: true,
        placeholder: this.$t("settings.profile.firstName"),
        validator: validators.string,
      },
      {
        id: "phone",
        type: "input",
        inputType: "phone",
        label: this.$t("settings.profile.phone"),
        model: "phone",
        placeholder: this.$t("settings.profile.phone"),
      },
      {
        id: "role",
        type: "radios",
        label: this.$t("settings.profile.role"),
        model: "role",
        placeholder: this.$t("settings.profile.role"),
        required: true,
        validator: validators.number,
        values: [
          { name: TenantUserRole[0], value: 0 },
          { name: TenantUserRole[1], value: 1 },
          { name: TenantUserRole[2], value: 2 },
          { name: TenantUserRole[3], value: 3 },
        ],
      },
    ],
  };
  private role!: TenantUserRole;
  private activeProduct!: StripeProduct;
  private memberCount!: number;
  private isOwnerOrAdmin!: boolean;
  private formOptions: any = {
    validateAfterLoad: false,
    validateAfterChanged: true,
    validateAsync: true,
  };
  created() {
    this.configureSchema();
  }
  mounted() {
    if (this.propTenantApiKey) {
      this.tenantApiKey = this.propTenantApiKey;
    }
    if (this.$route.params.id) {
      this.disabled = true;
      this.id = this.$route.params.id;
      this.editing = true;
      this.services.tenantUsers
        .getUser(this.id)
        .then((response: any) => {
          this.model = response.data;
          this.disabled = false;
        })
        .catch((error) => {
          // // @ts-ignore
          // this.$refs["error-modal"].show(this.$t("shared.notFound"));
          this.$router.push({ path: "/app/settings/organization/members" });
        });
    } else {
      this.disabled = false;
      const maxNumberOfUsers: number =
        this.activeProduct && this.activeProduct.maxUsers
          ? this.activeProduct.maxUsers
          : 0;

      // @ts-ignore
      if (maxNumberOfUsers > 0 && this.memberCount >= maxNumberOfUsers) {
        // @ts-ignore
        this.$refs["confirm-upgrade"].show(
          this.$t("settings.tenant.members.maxNumberOfUsers") +
            " (" +
            maxNumberOfUsers +
            "). " +
            this.$t("shared.upgrade?")
        );
      }
    }
  }
  // getFeatureValue(featureKey: string): number {
  //   if (this.activeProduct && this.activeProduct.features) {
  //     const feature = this.activeProduct.features.find(
  //       (f) => f.key === featureKey
  //     );
  //     if (!feature || !feature.value) {
  //       return 0;
  //     } else {
  //       return Number(feature.value);
  //     }
  //   }
  //   return 0;
  // }
  configureSchema() {
    // this.schema.fields[3].values = this.categories;
  }
  cancel() {
    this.eventBus.$emit("user-canceled");
    this.$router.push({ path: "/app/settings/organization/members" });
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
    if (this.editing) {
      this.services.tenantUsers
        .updateUser(this.model, this.tenantApiKey)
        .then((response) => {
          this.eventBus.$emit("user-saved", this.model);
          this.$router.push({ path: "/app/settings/organization/members" });
        })
        .catch((error) => {
          // @ts-ignore
          this.$refs["error-modal"].show(error);
        });
    } else {
      this.services.tenantUsers
        .inviteUser(this.model, this.tenantApiKey)
        .then((response: any) => {
          this.eventBus.$emit("user-added", response.data);
          this.$router.push({ path: "/app/settings/organization/members" });
        })
        .catch((error) => {
          // @ts-ignore
          this.$refs["error-modal"].show(error);
        });
    }
  }
  yesUpdateSubscription() {
    this.$router.push({ path: "/app/settings/organization/subscription" });
  }
  noUpdateSubscription() {
    this.$router.push({ path: "/app/settings/organization/members" });
  }
  remove() {
    // @ts-ignore
    this.$refs["confirm-remove"].show(this.$t("shared.remove?"));
  }
  yesRemove() {
    if (this.editing) {
      if (this.role === TenantUserRole.Member) {
        // @ts-ignore
        this.$refs["error-modal"].show(this.$t("account.tenant.onlyAdmin"));
      } else {
        this.services.tenantUsers
          .deleteUser(this.model.id)
          .then((response) => {
            this.eventBus.$emit("user-deleted", this.model);
            this.$router.push({ path: "/app/settings/organization/members" });
          })
          .catch((error) => {
            // @ts-ignore
            this.$refs["error-modal"].show(error);
          });
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
