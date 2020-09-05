/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vue from "vue";
import Vuex, { Store, StoreOptions } from "vuex";
import createLogger from "vuex/dist/logger";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

// Modules
import { locale } from "./modules/locale";
import { account, state as accountStore } from "./modules/account";
import { auth, state as authStore } from "./modules/auth";
import { tenant, state as tenantStore } from "./modules/tenant";
import { pricing, state as pricingStore } from "./modules/pricing";
import { theme, state as themeState } from "./modules/theme";
import { RootState } from "@/types/stateTypes";

const debug = process.env.NODE_ENV !== "production";

const store: StoreOptions<RootState> = {
  modules: {
    locale,
    account,
    auth,
    // navigation,
    tenant,
    pricing,
    theme,
  },
  strict: false,
  plugins: debug ? [createPersistedState()] : [createPersistedState()],
};
export default new Vuex.Store<RootState>(store);
