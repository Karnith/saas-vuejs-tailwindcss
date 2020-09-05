import VueI18n from "vue-i18n";
import { i18n } from "../../plugins/vue-i18n";
import { UserType } from "../../app/models/system/account/IUserDTO";
import { SideBarItem } from "./SidebarItem";

export const adminSidebar: SideBarItem[] = [
  {
    title: i18n.t("app.sidebar.manage"),
    items: [
      {
        title: i18n.t("shared.dashboard"),
        path: "/admin/dashboard",
        icon: "chart-line",
      },
      {
        title: i18n.t("admin.tenants"),
        path: "/admin/tenants",
        icon: "users",
      },
      {
        title: i18n.t("admin.pricing.title"),
        path: "/admin/products",
        icon: "tags",
      },
      {
        title: i18n.t("admin.resources.title"),
        path: "/admin/resources",
        icon: "file-download",
      },
      {
        title: i18n.t("admin.switchToApp"),
        path: "/app",
        icon: "external-link-alt",
        userTypes: [UserType.Admin],
      },
    ],
  },
];
