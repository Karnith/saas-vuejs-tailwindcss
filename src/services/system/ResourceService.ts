import server from "../../plugins/axios-helper";
import store from "@/store";
import { IResourceDTO } from "@/app/models/system/resources/IResourceDTO";
import { getResourcesFakeResponse } from "./FakeResourcesServer";
class ResourceService {
  getMyResources() {
    return new Promise((resolve, reject) => {
      resolve(getResourcesFakeResponse);
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .get("resource/myResources/" + store.state.tenant.current?.apiKey, {
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
  getResources() {
    return new Promise((resolve, reject) => {
      resolve(getResourcesFakeResponse);
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .get("resource/get", { masterDatabase: true })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  download(uuid: string) {
    return new Promise((resolve, reject) => {
      server
        .post(
          "resource/download/" +
            store.state.tenant.current?.apiKey +
            "/" +
            uuid,
          null,
          {
            masterDatabase: true,
            responseType: "blob",
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
  create(payload: IResourceDTO) {
    return new Promise((resolve, reject) => {
      server
        .post("resource/create", payload, {
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
  upload(uuid: string, fileData: FormData) {
    return new Promise((resolve, reject) => {
      server
        .post("resource/upload?uuid=" + uuid, fileData, {
          masterDatabase: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  update(uuid: string, payload: IResourceDTO) {
    return new Promise((resolve, reject) => {
      server
        .put("resource/update/" + uuid, payload, { masterDatabase: true })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  delete(uuid: string) {
    return new Promise((resolve, reject) => {
      server
        .delete("resource/delete/" + uuid, { masterDatabase: true })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
export const resourceService = new ResourceService();
