export interface IUserDTO {
  id: number;
  username: string;
  email: string;
  type: UserType;
  company: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateJoined: Date;
  dateJoinedDesc: string;
  loginType: LoginType;
  stripeCustomerId: string;
  passwordCurrent: string;
  passwordNew: string;
  passwordConfirm: string;
  avatar: string;
}
export enum LoginType {
  Password,
  Gmail,
}

export enum UserType {
  Admin,
  Tenant,
}
