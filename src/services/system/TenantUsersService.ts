import server from "../../plugins/axios-helper";
import store from "@/store";
import { ITenantUserDTO } from "@/app/models/system/account/ITenantDTO";
import { ITenantJoinSettingsDTO } from "@/app/models/system/account/ITenantJoinSettingsDTO";
import { IVerifyDTO } from "@/app/models/system/account/IVerifyDTO";
import {
  fakeTenantUser,
  fakeTenantUser2,
  fakeTenantOrg1,
} from "./FakeAuthenticationServer";
import { updateInvitationSettingsFakeResponse } from "./FakeTenantUsersServer";

class TenantUsersService {
  getUsers(apiKey?: string) {
    if (!apiKey) {
      apiKey = store.state.tenant.current?.apiKey;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        store.commit("tenant/members", [fakeTenantUser, fakeTenantUser2]);
        resolve({ data: [fakeTenantUser, fakeTenantUser2] });
      }, 1500);
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .get("tenantUsers/users/" + apiKey, {
          masterDatabase: true,
        })
        .then((response) => {
          store.commit("tenant/members", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getUser(id: number) {
    return new Promise((resolve, reject) => {
      resolve({ data: fakeTenantUser });
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .get(
          "tenantUsers/user/" + store.state.tenant.current?.apiKey + "/" + id,
          {
            masterDatabase: true,
          }
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  deleteUser(id?: number) {
    return new Promise((resolve, reject) => {
      server
        .delete(
          "tenantUsers/deleteUser/" +
            store.state.tenant.current?.apiKey +
            "/" +
            id,
          {
            masterDatabase: true,
          }
        )
        .then((response) => {
          this.getUsers();
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updateUser(payload: ITenantUserDTO, apiKey?: string) {
    if (!apiKey) {
      apiKey = store.state.tenant.current?.apiKey;
    }
    return new Promise((resolve, reject) => {
      server
        .put("tenantUsers/updateUser/" + apiKey, payload, {
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
  inviteUser(payload: ITenantUserDTO, apiKey?: string) {
    if (!apiKey) {
      apiKey = store.state.tenant.current?.apiKey;
    }
    return new Promise((resolve, reject) => {
      server
        .post("tenantUsers/invite/" + apiKey, payload, {
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
  requestAccess(payload: IVerifyDTO) {
    console.log(payload);
    return new Promise((resolve, reject) => {
      server
        .post("tenantUsers/requestAccess/" + payload.token, payload, {
          masterDatabase: true,
        })
        .then((response) => {
          if (response.data.auth) {
            store.commit("auth/login", response.data.auth);
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  acceptInvitation(payload: IVerifyDTO) {
    return new Promise((resolve, reject) => {
      server
        .post("tenantUsers/acceptInvitation/" + payload.token, payload, {
          masterDatabase: true,
        })
        .then((response) => {
          store.commit("auth/login", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  acceptUser(payload: ITenantUserDTO) {
    return new Promise((resolve, reject) => {
      server
        .post(
          "tenantUsers/acceptUser/" + store.state.tenant.current?.apiKey,
          payload,
          {
            masterDatabase: true,
          }
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getInvitation(uuid: string) {
    return new Promise((resolve, reject) => {
      server
        .get("tenantUsers/invitation/" + uuid, {
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
  getInviteURL(uuid: string) {
    return new Promise((resolve, reject) => {
      resolve({ data: { tenant: fakeTenantOrg1 } });
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .get("tenantUsers/inviteURL/" + uuid, {
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
  getInvitationSettings() {
    return new Promise((resolve, reject) => {
      resolve(updateInvitationSettingsFakeResponse);
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .get(
          "tenantUsers/invitationSettings/" +
            store.state.tenant.current?.apiKey,
          {
            masterDatabase: true,
          }
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updateInvitationSettings(payload: ITenantJoinSettingsDTO) {
    return new Promise((resolve, reject) => {
      const newInvitationSettings = updateInvitationSettingsFakeResponse.data;
      newInvitationSettings.linkActive = payload.enableLink;
      newInvitationSettings.publicUrl = payload.enablePublicUrl;
      newInvitationSettings.requireAcceptance = payload.requireAcceptance;
      resolve({ data: newInvitationSettings });
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .post(
          "tenantUsers/invitationSettings/" +
            store.state.tenant.current?.apiKey,
          payload,
          {
            masterDatabase: true,
          }
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
export const tenantUsersService = new TenantUsersService();
