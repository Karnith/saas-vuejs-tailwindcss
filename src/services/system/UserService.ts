import server from "../../plugins/axios-helper";
import store from "@/store";
import { IUserDTO } from "@/app/models/system/account/IUserDTO";

class UserService {
  updateProfile(payload: IUserDTO) {
    return new Promise((resolve, reject) => {
      const user = store.state.account.user;
      if (user) {
        user.firstName = payload.firstName;
        user.lastName = payload.lastName;
        user.phone = payload.phone;
        store.commit("account/logged", user);
        resolve({ data: user });
      }
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .put("user/UpdateProfile/" + store.state.account.user?.id, payload, {
          masterDatabase: true,
        })
        .then((response) => {
          store.commit("account/logged", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  uploadAvatar(avatar: string) {
    return new Promise((resolve, reject) => {
      const user = store.state.account.user;
      if (user) {
        user.avatar = avatar;
        store.commit("account/logged", user);
        resolve({ data: user });
      }
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .put(
          "user/uploadAvatar/" + store?.state.account.user?.id,
          { avatar },
          {
            masterDatabase: true,
          }
        )
        .then((response) => {
          store.commit("account/logged", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updatePassword(payload: IUserDTO) {
    return new Promise((resolve, reject) => {
      const user = store.state.account.user;
      if (user) {
        resolve({ data: user });
      }
      return;
      server
        .put("user/UpdatePassword/" + store.state.account.user?.id, payload, {
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
export const userService = new UserService();
