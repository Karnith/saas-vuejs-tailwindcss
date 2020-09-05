import { Entity } from "../../Entity";
import { TenantUserRole } from "../account/ITenantDTO";

export interface IResourceDTO extends Entity {
  title: string;
  description: string;
  type: FileType;
  tiers: number[];
  roles: TenantUserRole[];
  hasFile: boolean;
  needsUpgrade: boolean;
  needsPermission: boolean;
}

export enum FileType {
  Zip,
}
