export interface RefreshModel {
  accessToken: string;
  user: {
    id: number;
    provider: 'google.com';
    userLoginId: 'test@gmail.com';
  };
}
