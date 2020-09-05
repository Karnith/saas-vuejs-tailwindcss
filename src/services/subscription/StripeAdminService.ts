import server from "../../plugins/axios-helper";
import { StripePrice } from "@/app/models/subscription/StripePrice";
import { StripeProduct } from "@/app/models/subscription/StripeProduct";

class StripeAdminService {
  syncProduct(createInStripe: boolean, product: StripeProduct) {
    return new Promise((resolve, reject) => {
      return server
        .post("stripeAdmin/syncProduct/" + createInStripe, product, {
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
  syncPrice(createInStripe: boolean, price: StripePrice) {
    return new Promise((resolve, reject) => {
      return server
        .post("stripeAdmin/syncPrice/" + createInStripe, price, {
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
  deleteProduct(deleteInStripe: boolean, uuid?: string) {
    return server.delete(
      "stripeAdmin/deleteProduct/" + deleteInStripe + "/" + uuid,
      { masterDatabase: true }
    );
  }
  deletePrice(deleteInStripe: number, uuid?: string) {
    return server.get(
      "stripeAdmin/deletePrice/" + deleteInStripe + "/" + uuid,
      {
        masterDatabase: true,
      }
    );
  }
}
export const stripeAdminService = new StripeAdminService();
