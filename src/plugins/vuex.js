/* ============
 * Vuex Store
 * ============
 *
 * Vuex is a state management pattern + library for Vue.js applications.
 * It serves as a centralized store for all the components in an application,
 * with rules ensuring that the state can only be mutated in a predictable fashion.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vue from 'vue';
import Vuex from 'vuex';

import VuexRouterSync from 'vuex-router-sync';
import store from '@/store';
import router from '@/router';

VuexRouterSync.sync(store, router);

Vue.use(Vuex);