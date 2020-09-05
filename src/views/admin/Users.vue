<template>
  <div>
    <div v-if="tenantApiKey">
      <tenant-members
        :title="tenantName + ' ' + $t('models.user.plural').toString().toLowerCase()"
        :propTenantApiKey="tenantApiKey"
      ></tenant-members>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { adminService } from "../../services/system/AdminService";
import { IUserDTO } from "../../app/models/system/account/IUserDTO";
import TenantMembers from "@/components/app/settings/tenant/TenantMembers.vue";
@Component({ components: { TenantMembers } })
export default class UsersComponent extends Vue {
  private users?: IUserDTO[] = [];
  private tenantName: string = "";
  private tenantApiKey: string = "";
  mounted() {
    this.tenantName = this.$route.params.tenant.toString();
    this.tenantApiKey = this.$route.params.apiKey.toString();
  }
}
</script>
