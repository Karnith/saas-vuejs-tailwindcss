<template>
  <div>
    <div>
      <!-- <div v-if="loading">
        <table-row-skeleton></table-row-skeleton>
        <table-row-skeleton></table-row-skeleton>
        <table-row-skeleton></table-row-skeleton>
      </div>
      <div v-else>-->
      <div v-if="!items || items.length === 0">
        <div>{{ $t("shared.noRecords") }}</div>
      </div>
      <div v-else>
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
              <div
                class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
              >
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        v-if="enableDownload"
                        class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("shared.file") }}
                      </th>
                      <th
                        v-for="(column, idx) in columns"
                        :key="idx"
                        class="px-6 py-2 bg-gray-200 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ translateModelProperty(column.name) }}
                      </th>
                      <th
                        v-if="allowEdit"
                        class="pr-5 py-2 bg-gray-200 w-10"
                      ></th>
                      <th
                        v-if="enableUpload"
                        class="pr-5 py-2 bg-gray-200 w-10"
                      ></th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in orderedItems" :key="index">
                      <td
                        v-if="enableDownload"
                        class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                      >
                        <div v-if="!item.hasFile">
                          {{ $t("shared.notSet") }}
                        </div>
                        <div v-else>
                          <div v-if="item.needsUpgrade">
                            <button
                              @click="downloadFile(item)"
                              class="text-gray-400 cursor-not-allowed"
                            >
                              {{ $t("shared.download") }}
                            </button>
                          </div>
                          <div v-else-if="item.needsPermission">
                            <button
                              @click="downloadFile(item)"
                              class="text-gray-400 cursor-not-allowed"
                            >
                              {{ $t("shared.download") }}
                            </button>
                          </div>
                          <div v-else>
                            <button
                              @click="downloadFile(item)"
                              class="text-theme-600 hover:text-theme-900"
                            >
                              {{ $t("shared.download") }}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td
                        v-for="(column, idx) in columns"
                        :key="idx"
                        class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                      >
                        <span v-if="isArray(column)">
                          {{ convertedArray(item, column) }}
                        </span>
                        <span v-else-if="item[column.name] === true">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="h-4 w-4 text-teal-600"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                        <span v-else-if="item[column.name] === false">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="h-4 w-4 text-red-600"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                        <span v-else>{{ convertedValue(item, column) }}</span>
                      </td>

                      <td
                        v-if="allowEdit"
                        class="pr-5 py-4 whitespace-no-wrap text-right text-sm leading-3 font-medium"
                      >
                        <button
                          @click="edit(item)"
                          class="text-theme-600 hover:text-theme-900"
                        >
                          {{ $t("shared.edit") }}
                        </button>
                      </td>
                      <td
                        v-if="enableUpload"
                        class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                      >
                        <input
                          type="file"
                          v-on:change="uploadFile($event.target.files, item)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import { Prop } from "vue-property-decorator";
import { Entity, OrderedEntity } from "../../../app/models/Entity";
import { ColumnType, ValueType } from "../../../app/models/ColumnType";
@Component({})
export default class EntityTableListComponent extends BaseComponent {
  @Prop()
  public modelName!: string;
  @Prop()
  public routeName!: string;
  @Prop()
  public items!: Entity[];
  @Prop()
  public columns!: ColumnType[];
  @Prop({ default: true })
  public allowEdit!: boolean;
  @Prop({ default: false })
  public enableDownload!: boolean;
  @Prop({ default: false })
  public enableUpload!: boolean;

  private files: FormData = new FormData();
  edit(item: Entity) {
    this.$emit("edit", item);
  }
  downloadFile(item: Entity) {
    this.$emit("downloadFile", item);
  }
  uploadFile(fileList: any, item) {
    this.$emit("uploadFile", item, fileList);
  }
  translateModelProperty(columnName: string) {
    const translated = this.$t(`models.${this.modelName}.${columnName}`);
    return translated ?? columnName;
  }
  convertedValue(item: Entity, column: ColumnType): string {
    return ColumnType.convertValue(item, column);
  }
  convertedArray(item: Entity, column: ColumnType): any {
    if (
      column.valueType === ValueType.TenantUserRoles ||
      column.valueType === ValueType.StripeProducts
    ) {
      const values = ColumnType.getValues(column);
      const descriptions: any = [];
      values.forEach((element: any) => {
        if (item[column.name].includes(element.value)) {
          descriptions.push(element.name);
        }
      });
      const uniqueArray = [...new Set(descriptions)];
      return uniqueArray.join(", ");
    }
  }
  isBoolean(column: ColumnType): boolean {
    return column.valueType === ValueType.Bool;
  }
  isArray(column: ColumnType): boolean {
    return (
      column.valueType === ValueType.TenantUserRoles ||
      column.valueType === ValueType.StripeProducts
    );
  }
  isFile(column: ColumnType): boolean {
    return column.valueType === ValueType.File;
  }
  get orderedItems() {
    if (!this.items) {
      return [];
    }
    return this.items.sort((x, y) => {
      if (x && y) {
        if (x.hasOwnProperty("order")) {
          // @ts-ignore
          return x.order > y.order ? 1 : -1;
        } else {
          return x.id && y.id && x.id > y.id ? -1 : 1;
        }
      }
      return 1;
    });
  }
}
</script>
