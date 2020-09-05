import {
  BillingPeriod,
  PriceType,
} from "../../app/models/subscription/StripePrice";
import { FileType } from "./system/resources/IResourceDTO";
import store from "../../store";
import { TenantUserRole } from "./system/account/ITenantDTO";

export class ColumnType {
  public static convertValue(item: any, column: ColumnType): string {
    const value = item[column.name];

    if (value === null || value === undefined) {
      return "";
    }
    if (column.valueType) {
      switch (column.valueType as ValueType) {
        case ValueType.String:
        case ValueType.TextArea:
          return value;
        case ValueType.Money:
          return (
            "$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") || ""
          );
        case ValueType.PriceBillingPeriod:
          return BillingPeriod[value].toString();
        case ValueType.PriceType:
          return PriceType[value];
        case ValueType.ResourceFileType:
          return FileType[value];
        case ValueType.TenantUserRoles:
          return TenantUserRole[value];
        case ValueType.StripeProducts:
          const products = store.state.pricing.products;
          return products?.find((f) => f.tier === value)?.title ?? "";
        case ValueType.Bool:
          if (value) {
            return "yes";
          } else {
            return "no";
          }
        //     ? i18n.t("shared.active").toString()
        //     : i18n.t("shared.inactive").toString();
      }
    }
    return value;
  }
  public static getFormType(column: ColumnType) {
    if (column.values && column.values.length > 0) {
      return "select";
    }
    if (!column.valueType) {
      return "input";
    } else {
      switch (column.valueType as ValueType) {
        case ValueType.String:
        case ValueType.Money:
        case ValueType.Number:
          return "input";
        case ValueType.TextArea:
          return "textArea";
        case ValueType.Bool:
          return "checkbox";
        case ValueType.PriceType:
        case ValueType.PriceBillingPeriod:
        case ValueType.ResourceFileType:
          return "select";
        case ValueType.StripeProducts:
        case ValueType.TenantUserRoles:
          return "checklist";
        case ValueType.Image:
          // case ValueType.File:
          return "image";
        case ValueType.File:
          return "upload";
        default:
          break;
      }
    }
  }
  public static getFormInputType(column: ColumnType) {
    if (this.getFormType(column) === "input") {
      switch (column.valueType as ValueType) {
        case ValueType.Money:
        case ValueType.Number:
          return "number";
        case ValueType.File:
          return "file";
      }
      return "text";
    }
  }
  public static getValues(column: ColumnType) {
    if (column.values && column.values.length > 0) {
      return column.values;
    }
    let keys: any = [];
    let enumValues: any = [];
    const values: any = [];
    switch (column.valueType as ValueType) {
      case ValueType.PriceBillingPeriod:
        keys = Object.keys(BillingPeriod).filter(
          (k) => typeof BillingPeriod[k as any] === "number"
        );
        enumValues = keys.map((k) => BillingPeriod[k as any]); // [0, 1]
        enumValues.forEach((key) => {
          values.push({ name: BillingPeriod[key], id: key });
        });
        return values;
      case ValueType.PriceType:
        keys = Object.keys(PriceType).filter(
          (k) => typeof PriceType[k as any] === "number"
        );
        enumValues = keys.map((k) => PriceType[k as any]); // [0, 1]
        enumValues.forEach((key) => {
          values.push({ name: PriceType[key], id: key });
        });
        return values;
      case ValueType.ResourceFileType:
        keys = Object.keys(FileType).filter(
          (k) => typeof FileType[k as any] === "number"
        );
        enumValues = keys.map((k) => FileType[k as any]); // [0, 1]
        enumValues.forEach((key) => {
          values.push({ name: FileType[key], id: key });
        });
        return values;
      case ValueType.TenantUserRoles:
        keys = Object.keys(TenantUserRole).filter(
          (k) => typeof TenantUserRole[k as any] === "number"
        );
        enumValues = keys.map((k) => TenantUserRole[k as any]); // [0, 1]
        enumValues.forEach((key) => {
          values.push({ name: TenantUserRole[key], value: key });
        });
        return values;
      case ValueType.StripeProducts:
        const products = store.state.pricing.products;
        products.forEach((product) => {
          values.push({ name: product.title, value: product.tier });
        });
        return values;
      default:
        break;
    }
  }
  public name!: string;
  public valueType?: ValueType = ValueType.String;
  public optional?: boolean;
  public cannotEdit?: boolean;
  public values?: any[];
}
export enum ValueType {
  String,
  Bool,
  Money,
  PriceType,
  PriceBillingPeriod,
  Number,
  Image,
  ResourceFileType,
  File,
  StripeProducts,
  TenantUserRoles,
  TextArea,
}
