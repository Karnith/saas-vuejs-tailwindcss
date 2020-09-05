import { LoginType } from "./IUserDTO";

export interface ILoginDTO {
  email: string;
  password: string;
  type: string;
  loginType: LoginType;
  secretSignInKey: string;
}
