import type { AuthUser } from './auth.types';

export interface UpdateUsernamePayload {
  username: string;
}

export interface UpdateProfilePicturePayload {
  file: File;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateSettingsResponse {
  message: string;
  user?: AuthUser;
}
