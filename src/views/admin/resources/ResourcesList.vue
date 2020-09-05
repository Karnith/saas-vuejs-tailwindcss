<template>
  <div>
    <page-title>
      <template v-slot:title>{{ $t("admin.resources.title") }}</template>
      <template v-slot:buttons>
        <span class="hidden sm:block ml-3 shadow-sm rounded-md">
          <button
            @click="reload"
            type="button"
            class="h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >
            <i class="fa fa-redo -ml-1 mr-2 h-5 w-5 text-gray-500"></i>
            {{ $t("shared.reload") }}
          </button>
        </span>
        <span class="sm:ml-3 shadow-sm rounded-md">
          <button
            @click="adding = true"
            class="h-8 inline-flex items-center px-4 py-2 border border-theme-200 text-xs leading-5 font-medium rounded-md text-theme-700 bg-theme-100 hover:bg-theme-200 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            <i class="fa fa-plus -ml-1 mr-2 h-5 w-5 text-theme-700"></i>
            {{ $t("shared.new") }}
          </button>
        </span>
      </template>
    </page-title>
    <div class="mt-4 sm:mt-12">
      <div v-if="loading">
        <table-row-skeleton></table-row-skeleton>
        <table-row-skeleton></table-row-skeleton>
        <table-row-skeleton></table-row-skeleton>
      </div>
      <div v-else>
        <entity-table-list
          :modelName="modelName"
          :parentRoute="$route.path"
          routeName="resources"
          :columns="columns"
          :items="items"
          :allowEdit="true"
          v-on:edit="edit"
          v-on:downloadFile="downloadFile"
          v-on:uploadFile="uploadFile"
          :enableDownload="true"
          :enableUpload="true"
        ></entity-table-list>
      </div>
      <entity-form
        v-if="selected != null"
        v-on:added="added"
        v-on:saved="saved"
        v-on:deleted="deleted"
        v-on:canceled="canceled"
        :modelName="modelName"
        :object="selected"
        :columns="columns"
      ></entity-form>
      <entity-form
        v-if="adding"
        :modelName="modelName"
        :columns="columns"
        v-on:added="added"
        v-on:saved="saved"
        v-on:deleted="deleted"
        v-on:canceled="canceled"
      ></entity-form>
    </div>
    <div class="bg-yellow-100 mb-2 rounded-md border border-yellow-300 mt-8">
      <div class="rounded-md bg-yellow-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div class="ml-3">
            <h3
              class="text-sm leading-5 font-medium text-yellow-800"
            >{{ $t("netcoresaas.backendNeeded") }}</h3>
            <div class="mt-2 text-sm leading-5 text-yellow-700">
              <p>{{ $t("netcoresaas.fakeData") }}</p>
            </div>
            <div class="text-sm leading-5 right-0 -ml-3 mt-2">
              <span class="inline-flex rounded-md ml-2">
                <a
                  href="https://netcoresaas.com/product"
                  target="_blank"
                  class="flex items-center justify-center px-4 py-2 border border-transparent text-sm bg-orange-200 leading-5 font-medium rounded-md text-orange-800 bg-white hover:text-orange-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                >{{ $t("netcoresaas.getBackend") }}</a>
              </span>
               <span class="inline-flex rounded-md ml-2">
                <a
                href="https://demo.netcoresaas.com"
                  target="_blank"
                  class="flex items-center justify-center px-4 py-2 border border-transparent text-sm bg-orange-200 leading-5 font-medium rounded-md text-orange-800 bg-white hover:text-orange-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                >{{ $t("netcoresaas.demo") }}</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <error-modal ref="error-modal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import { ColumnType, ValueType } from "../../../app/models/ColumnType";
import PageTitle from "@/components/shared/navigation/PageTitle.vue";
import EntityTableList from "@/components/shared/entities/EntityTableList.vue";
import EntityForm from "@/components/shared/entities/EntityForm.vue";
import { TenantUserRole } from "../../../app/models/system/account/ITenantDTO";
const fileDownload = require("js-file-download");

@Component({ components: { PageTitle, EntityTableList, EntityForm } })
export default class ResourcesListComponent extends BaseComponent {
  private modelName: string = "resource";
  private columns: ColumnType[] = [
    {
      name: "title",
    },
    {
      name: "description",
      valueType: ValueType.TextArea,
      optional: true,
    },
    {
      name: "tiers",
      valueType: ValueType.StripeProducts,
    },
    {
      name: "roles",
      valueType: ValueType.TenantUserRoles,
    },
  ];
  private selected = null as any | null;
  private adding: boolean = false;
  private items: any = [];
  mounted() {
    this.items = [];
    this.reload();
  }
  reload() {
    this.loading = true;
    this.services.resources
      .getResources()
      .then((response: any) => {
        this.items = response.data;
      })
      .finally(() => {
        this.loading = false;
      });
  }
  closeForm(hasChanges = false) {
    this.selected = null;
    this.adding = false;
    if (hasChanges) {
      // @ts-ignore
      this.$parent.hasChanges = true;
    }
  }
  edit(item: any) {
    this.selected = item;
  }
  downloadFile(item: any, column: ColumnType) {
    console.log("downloadFile");
    // @ts-ignore
    this.$refs["error-modal"].show(this.$t("netcoresaas.backendNeeded"));
    return;
    this.services.resources
      .download(item.uuid)
      .then((response: any) => {
        const disposition = response.headers["content-disposition"];
        let fileName = "";

        if (disposition && disposition.indexOf("attachment") !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            fileName = matches[1].replace(/['"]/g, "");
          }
        }
        const type: string = "application/zip";
        if (item.type.toString().toLowerCase() !== ".zip") {
          fileDownload(response.data, item.title + item.type);
          return;
        } else {
          const fileUrl = window.URL.createObjectURL(
            new Blob([response.data], { type })
          );
          const fileLink = document.createElement("a");
          fileLink.href = fileUrl;
          fileLink.setAttribute("download", item.title);
          document.body.appendChild(fileLink);
          fileLink.click();
        }
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  uploadFile(item: any, fileList: any) {
    console.log("uploadFile: " + fileList);
    const files: FormData = new FormData();
    files.append("file", fileList[0], fileList[0].name);
    this.services.resources
      .upload(item.uuid, files)
      .then((response: any) => {
        console.log("uploaded");
        item.hasFile = true;
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  added(data: any) {
    console.log("added");
    this.services.resources.create(data).then((response) => {
      // @ts-ignore
      this.items.push(response.data);
      this.selected = null;
      this.closeForm(true);
    });
  }
  saved(data: any) {
    console.log("saved");
    this.services.resources.update(data.uuid, data).then((response) => {
      // @ts-ignore
      const idx = this.items.findIndex((f) => f.uuid === data.uuid);
      this.items[idx] = data;
      this.closeForm(true);
    });
  }
  deleted(data: any) {
    console.log("deleted");
    this.services.resources.delete(data.uuid).then((response) => {
      // @ts-ignore
      this.items = this.items.filter((f) => f.uuid !== data.uuid);
      this.closeForm(true);
    });
  }
  canceled() {
    console.log("canceled");
    this.closeForm();
  }
}
</script>
