import { RefrigeratorStatusType } from '@/types/type';

export interface CreateModel {
  id: number;
  code: string;
  name: string;
  isShowUserName: boolean;
  maxCountStoragePerUser: number;
  status: RefrigeratorStatusType;
}
