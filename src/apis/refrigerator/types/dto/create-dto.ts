export interface CreateDto {
  name: string;
  code?: string;
  isShowUserName: boolean;
  maxCountStoragePerUser: number;
  userName: string;
}
