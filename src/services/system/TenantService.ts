import server from "../../plugins/axios-helper";
import store from "@/store";
import { StripeProduct } from "@/app/models/subscription/StripeProduct";
import {
  ITenantDTO,
  ITenantUserDTO,
} from "@/app/models/system/account/ITenantDTO";
import { ITenantJoinSettingsDTO } from "@/app/models/system/account/ITenantJoinSettingsDTO";
import { StripePrice } from "@/app/models/subscription/StripePrice";
import { state } from "@/store/modules/locale";
import { defaultState as defaultTheme } from "@/store/modules/theme";
import { fakeTenantOrg1, fakeTenantOrg2 } from "./FakeAuthenticationServer";

class TenantService {
  getFromURL() {
    return new Promise((resolve, reject) => {
      server
        .get("tenant/tenantFromURL", {
          masterDatabase: true,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getMyTenants() {
    return new Promise((resolve, reject) => {
      const tenants = store.state.tenant.tenants;
      store.commit("tenant/myTenants", tenants);
      resolve({ data: { tenants } });
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .get("tenant/MyTenants/" + store.state.tenant.current?.apiKey, {
          masterDatabase: true,
        })
        .then((response) => {
          store.commit("tenant/myTenants", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  create(
    name: string,
    stripePrice: StripePrice | undefined,
    stripeCardToken: string
  ) {
    const newTenant = {
      name,
      stripePrice,
      stripeCardToken,
      appTheme: defaultTheme.appTheme,
      appColor: defaultTheme.appColor,
    };
    return new Promise((resolve, reject) => {
      server
        .post("tenant/create", newTenant, { masterDatabase: true })
        .then((response) => {
          store.commit("auth/login", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  changeDefault(apikey: string) {
    return new Promise((resolve, reject) => {
      const current = store.state.tenant.current;
      if (current?.apiKey === fakeTenantOrg1.apiKey) {
        store.commit("tenant/current", fakeTenantOrg2);
        resolve({ data: { currentTenant: fakeTenantOrg2 } });
      } else {
        store.commit("tenant/current", fakeTenantOrg1);
        resolve({ data: { currentTenant: fakeTenantOrg1 } });
      }
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .post("tenant/changeDefault/" + apikey, null, { masterDatabase: true })
        .then((response) => {
          store.commit("tenant/current", response.data.currentTenant);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  update(payload: ITenantDTO, apiKey?: string) {
    if (!apiKey) {
      apiKey = store.state.tenant.current?.apiKey;
    }
    return new Promise((resolve, reject) => {
      const current = store.state.tenant.current;
      if (current) {
        store.commit("tenant/settings", payload);
        resolve({ data: payload });
      }
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .put("tenant/UpdateTenant/" + apiKey, payload, { masterDatabase: true })
        .then((response) => {
          store.commit("tenant/settings", payload);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  uploadImage(payload: ITenantDTO, type: string) {
    return new Promise((resolve, reject) => {
      const tenant = store.state.tenant.current;
      if (tenant) {
        if (type === "icon") {
          tenant.icon = payload.icon;
        } else if (type === "logo") {
          tenant.logo = payload.logo;
        } else if (type === "logoDarkmode") {
          tenant.logoDarkmode = payload.logoDarkmode;
        }
        resolve({ data: tenant });
      }
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .put(
          "tenant/uploadImage/" +
            store.state.tenant.current?.apiKey +
            "/" +
            type,
          payload,
          { masterDatabase: true }
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  delete(apiKey?: string) {
    if (!apiKey) {
      apiKey = store.state.tenant.current?.apiKey;
    }
    return new Promise((resolve, reject) => {
      server
        .delete("tenant/delete/" + apiKey, {
          masterDatabase: true,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
export const tenantService = new TenantService();
