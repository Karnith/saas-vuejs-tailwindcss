import VueI18n from "vue-i18n";
import { UserType } from "../../app/models/system/account/IUserDTO";
import { TenantUserRole } from "../../app/models/system/account/ITenantDTO";

export interface SideBarItem {
  title: string | VueI18n.TranslateResult;
  path?: string;
  icon?: string;
  open?: boolean;
  userTypes?: UserType[];
  userRoles?: TenantUserRole[];
  items?: SideBarItem[];
}
