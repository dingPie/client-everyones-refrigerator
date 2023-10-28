export interface LoginDto {
  userLoginId: string;
  provider: string;
  providerUid: string;
  fcmToken?: string;
}
