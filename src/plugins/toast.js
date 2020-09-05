/* ============
 * Toast
 * ============
 *
 * info/error toasts
 */

import { app } from "@/main";
import Vue from "vue";
import { BreadstickBakery } from "breadstick";
Vue.use(BreadstickBakery);

const toast = {
  error: (message, title = "Error", status = 0) => {
    app.$breadstick.notify("⚠️ " + message);
    // app.$bvToast.toast(message, {
    //   title: title,
    //   variant: "danger",
    // });
  },
  success: (message, title = "Éxito") => {
    app.$breadstick.notify("✔️ " + message);

    // app.$bvToast.toast(message, {
    //   title: title,
    //   variant: "success",
    // });
  },
};
Vue.$toast = toast;
Object.defineProperty(Vue.prototype, "$toast", {
  get() {
    return toast;
  },
});
export default toast;
