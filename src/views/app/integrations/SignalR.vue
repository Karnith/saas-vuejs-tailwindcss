<template>
  <div>
    <div>
      <form @submit.prevent>
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-2">
                <label
                  for="passwordCurrent"
                  class="block text-sm font-medium leading-5 text-gray-700"
                  >User</label
                >
                <input
                  required
                  :disabled="true"
                  v-model="userName"
                  class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
              <div class="col-span-6 sm:col-span-4">
                <label
                  for="password"
                  class="block text-sm font-medium leading-5 text-gray-700"
                  >Message</label
                >
                <input
                  ref="message"
                  v-model="message"
                  class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              v-on:click="submitCard"
              class="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out"
            >
              {{ $t("shared.send") }}
            </button>
          </div>
        </div>
      </form>

      <div
        class="mt-3"
        v-for="(item, index) in messages"
        v-bind:key="index + 'itemMessage'"
      >
        <div class>
          <b>{{ item.user }}:</b>
          {{ item.message }}
        </div>
      </div>
    </div>
    <div class="bg-theme-100 mb-2 rounded-md border border-theme-300 mt-8">
      <div class="rounded-md bg-theme-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-theme-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div class="ml-3">
            <h3 class="text-sm leading-5 font-medium text-theme-800">
              {{ $t("netcoresaas.backendNeeded") }}
            </h3>
            <div class="mt-2 text-sm leading-5 text-theme-700">
              <p>{{ $t("netcoresaas.fakeData") }}</p>
            </div>
            <div class="text-sm leading-5 right-0 -ml-3 mt-2">
              <span class="inline-flex rounded-md ml-2">
                <a
                  href="https://netcoresaas.com/product"
                  target="_blank"
                  class="flex items-center justify-center px-4 py-2 border border-transparent text-sm bg-theme-200 leading-5 font-medium rounded-md text-theme-800 bg-white hover:text-theme-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                  >{{ $t("netcoresaas.getBackend") }}</a
                >
              </span>
              <span class="inline-flex rounded-md ml-2">
                <a
                  href="https://demo.netcoresaas.com"
                  target="_blank"
                  class="flex items-center justify-center px-4 py-2 border border-transparent text-sm bg-theme-200 leading-5 font-medium rounded-md text-theme-800 bg-white hover:text-theme-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                  >{{ $t("netcoresaas.demo") }}</a
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import { SignalService } from "../../../plugins/SignalR";
import * as signalR from "@aspnet/signalr";

@Component({
  components: { SuccessModal, ErrorModal, ConfirmModal },
})
export default class SignalR extends BaseComponent {
  userName: string = this.$store.state.account.user.email;
  message: string = "";
  messages: any[] = [];
  connection!: signalR.HubConnection;
  hubUrl!: string;
  created() {
    this.hubUrl = process.env.VUE_APP_SERVER_URL + "globalHub";
    // this.connection = new signalR.HubConnectionBuilder()
    //   .withUrl(this.hubUrl)
    //   .configureLogging(signalR.LogLevel.Information)
    //   .build();
    // this.connection
    //   .start()
    //   .then((response) => {
    //     this.joinGroup();
    //     return true;
    //   })
    //   .catch((err) => {
    //     return console.error(
    //       "Could not connect to Hub '" + this.hubUrl + "':" + err.toString()
    //     );
    //   });
  }
  mounted() {
    const self = this;
    // this.connection.on("ReceiveMessage", (user, message) => {
    //   self.messages.push({ user, message });
    // });
  }
  async joinGroup() {
    this.connection
      .invoke("JoinGroup", this.$store.state.tenant.current?.apiKey)
      .then((response) => {
        console.log("JoinGroup Success:" + JSON.stringify(response));
      })
      .catch((err) => {
        console.log("JoinGroup Error:" + JSON.stringify(err));
      });
  }
  submitCard() {
    if (this.message) {
      this.messages.push({
        user: this.userName,
        message: this.message + " fake",
      });
      // this.connection
      //   .invoke(
      //     "SendMessage",
      //     this.$store.state.tenant.current.apiKey,
      //     this.userName,
      //     this.message
      //   )
      //   .then((response) => {
      //     this.message = "";
      //     // @ts-ignore
      //     this.$refs.message.focus();
      //   })
      //   .catch((err) => {
      //     return console.error(err.toString());
      //   });
    }
  }
}
</script>
