import server from "../../plugins/axios-helper";
import store from "@/store";
import { defaultProductsDevelopment } from "@/store/modules/pricing/default-pricing.Development";
import { defaultProducts } from "@/store/modules/pricing/default-pricing";
import {
  StripePrice,
  BillingPeriod,
} from "@/app/models/subscription/StripePrice";
import { StripeProduct } from "@/app/models/subscription/StripeProduct";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
const debug = process.env.NODE_ENV !== "production";
import { getCurrentCustomerFakeResponse } from "./FakeStripeService";

class StripeService {
  getProducts(fromServer: boolean, onlyActive: boolean) {
    fromServer = false;
    return new Promise((resolve, reject) => {
      if (!fromServer) {
        let products: StripeProduct[] = [];
        if (debug) {
          products = defaultProductsDevelopment;
        } else {
          products = defaultProducts;
        }
        if (onlyActive) {
          products = products.filter(
            (f) => f.active && f.prices.find((f) => f.active)
          );
        }
        store.commit("pricing/products", products);
        resolve(products);
      } else {
        // unavailable on frontend, implement your own or get netcoresaas.com
        resolve(null);
        server
          .get("stripe/products", {
            masterDatabase: true,
          })
          .then((response) => {
            store.commit("pricing/products", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }
  getProduct(uuid: string) {
    return new Promise((resolve, reject) => {
      server
        .get("stripe/product/" + uuid, {
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
  getPrice(uuid: string) {
    return new Promise((resolve, reject) => {
      server
        .get("stripe/price/" + uuid, {
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
  getCurrentCustomer() {
    return new Promise((resolve, reject) => {
      store.commit("tenant/stripe", getCurrentCustomerFakeResponse.data);
      resolve(getCurrentCustomerFakeResponse);
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .get("stripe/getCurrent/" + store.state.tenant.current?.apiKey, {
          masterDatabase: true,
        })
        .then((response) => {
          store.commit("tenant/stripe", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  cancel() {
    return new Promise((resolve, reject) => {
      server
        .post("stripe/cancel/" + store.state.tenant.current?.apiKey, null, {
          masterDatabase: true,
        })
        .then((response) => {
          store.commit("tenant/stripe", response.data);
          store.commit("pricing/select", {
            product: null,
            billingPeriod: BillingPeriod.Monthly,
          });
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updateSubscription(price: StripePrice) {
    return new Promise((resolve, reject) => {
      server
        .post(
          "stripe/updateSubscription/" + store.state.tenant.current?.apiKey,
          price,
          {
            masterDatabase: true,
          }
        )
        .then((response) => {
          store.commit("tenant/stripe", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  updateCard(stripeToken: string) {
    return new Promise((resolve, reject) => {
      server
        .post(
          "stripe/updateCard/" +
            store.state.tenant.current?.apiKey +
            "?stripeToken=" +
            stripeToken,
          null,
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
  getUpcomingInvoice() {
    return new Promise((resolve, reject) => {
      resolve({ data: [] });
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      return server
        .get("stripe/upcomingInvoice/" + store.state.tenant.current?.apiKey, {
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
  createCustomerPortalSession() {
    return new Promise((resolve, reject) => {
      return server
        .post(
          "stripe/createCustomerPortalSession/" +
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
}
export const stripeService = new StripeService();
