import server from "../../plugins/axios-helper";
import store from "@/store";
import { IRegisterDTO } from "@/app/models/system/account/IRegisterDTO";
import { ILoginDTO } from "@/app/models/system/account/ILoginDTO";
import { LoginType } from "@/app/models/system/account/IUserDTO";
import { IVerifyDTO } from "@/app/models/system/account/IVerifyDTO";
import {
  loginFakeResponse,
  fakeUserAdmin,
  fakeUserTenant,
} from "./FakeAuthenticationServer";

class AuthenticationService {
  login(payload: ILoginDTO) {
    return new Promise((resolve, reject) => {
      loginFakeResponse.data.user = fakeUserTenant;
      if (payload.email === fakeUserAdmin.email) {
        loginFakeResponse.data.user = fakeUserAdmin;
      }
      setTimeout(() => {
        store.commit("auth/login", loginFakeResponse.data);
        resolve(loginFakeResponse);
      }, 1500);
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .post("authentication/login", payload, { masterDatabase: true })
        .then((response) => {
          store.commit("auth/login", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  register(payload: IRegisterDTO) {
    return new Promise((resolve, reject) => {
      loginFakeResponse.data.user = fakeUserTenant;
      if (payload.email === fakeUserAdmin.email) {
        loginFakeResponse.data.user = fakeUserAdmin;
      }
      setTimeout(() => {
        store.commit("auth/login", loginFakeResponse.data);
        resolve(loginFakeResponse);
      }, 1500);
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .post("authentication/register", payload, { masterDatabase: true })
        .then((response) => {
          if (payload.loginType !== LoginType.Password) {
            store.commit("auth/login", response.data);
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  verify(payload: IVerifyDTO) {
    return new Promise((resolve, reject) => {
      server
        .post("authentication/verify", payload, { masterDatabase: true })
        .then((response) => {
          store.commit("auth/login", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  reset(email: string) {
    return new Promise((resolve, reject) => {
      server
        .post("authentication/reset/" + email, {
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
export const authenticationService = new AuthenticationService();
