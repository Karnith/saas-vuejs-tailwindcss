import {
  IResourceDTO,
  FileType,
} from "../../app/models/system/resources/IResourceDTO";
import { TenantUserRole } from "@/app/models/system/account/ITenantDTO";
import { i18n } from "../../plugins/vue-i18n";

export const resources: IResourceDTO[] = [];
for (let index = 1; index < 5; index++) {
  const resource: IResourceDTO = {
    title: i18n.t("models.resource.object") + " " + index,
    description: i18n.t("models.resource.description") + " " + index,
    type: FileType.Zip,
    tiers: index % 2 === 0 ? [1, 2, 3] : [3],
    roles:
      index % 2 === 0
        ? [TenantUserRole.Admin, TenantUserRole.Owner]
        : [TenantUserRole.Admin],
    hasFile: true,
    needsPermission: index % 2 !== 0,
    needsUpgrade: index % 2 !== 0,
  };
  resources.push(resource);
}
export const getResourcesFakeResponse = {
  data: resources,
};
