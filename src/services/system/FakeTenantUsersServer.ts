import { fakeTenantOrg1 } from "./FakeAuthenticationServer";
export const invitationSettings = {
  tenant: fakeTenantOrg1,
  link: "abc123",
  linkActive: true,
  publicUrl: true,
  requireAcceptance: false,
};
export const updateInvitationSettingsFakeResponse = {
  data: invitationSettings,
};
