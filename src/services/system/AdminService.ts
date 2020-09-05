import server from "../../plugins/axios-helper";
import { fakeTenantOrg1, fakeTenantOrg2 } from "./FakeAuthenticationServer";

class AdminService {
  getTenants() {
    return new Promise((resolve, reject) => {
      resolve({ data: [fakeTenantOrg1, fakeTenantOrg2] });
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      return server
        .get("admin/tenants", { masterDatabase: true })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getUsers() {
    return new Promise((resolve, reject) => {
      return server
        .get("admin/users", { masterDatabase: true })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  deleteTenant(id: number) {
    return server.delete("admin/tenant?id=" + id, { masterDatabase: true });
  }
  deleteUser(id: number) {
    return server.get("admin/users?id=", { masterDatabase: true });
  }
}
export const adminService = new AdminService();
