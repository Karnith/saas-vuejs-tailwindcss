import { Entity } from "../../Entity";
import { IUserDTO } from "./IUserDTO";
import { StripePrice } from "../../subscription/StripePrice";

export interface ITenantDTO {
  apiKey: string;
  name: string;
  domain: string;
  subdomain: string;
  icon: string;
  logo: string;
  logoDarkmode: string;
  appTheme: string;
  appColor: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  currentUser?: ITenantUser;
  products?: StripePrice[];
  memberCount?: number;
}

export interface ITenantUser extends Entity {
  tenantId: number;
  tenant?: ITenantDTO;
  userId: number;
  user: IUserDTO;
  role: TenantUserRole;
  active: boolean;
}

export interface ITenantUserDTO extends Entity {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  tenantId: number;
  tenant: ITenantDTO;
  userId: number;
  user: IUserDTO;
  role: TenantUserRole;
  joined: TenantUserJoined;
  status: TenantUserStatus;
  accepted: boolean;
}

export enum TenantUserRole {
  Owner,
  Admin,
  Member,
  Guest,
}
export enum TenantUserJoined {
  Creator,
  JoinedByInvitation,
  JoinedByLink,
  JoinedByPublicUrl,
}

export enum TenantUserStatus {
  PendingInvitation,
  PendingAcceptance,
  Active,
  Inactive,
}
