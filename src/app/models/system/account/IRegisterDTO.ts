import { LoginType } from "./IUserDTO";
import { StripePrice } from "../../subscription/StripePrice";

export interface IRegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  organization: string;
  // tenantHost: string;
  stripePrice: StripePrice;
  stripeCardToken: string;
  loginType: LoginType;
  secretSignInKey: string;
}
