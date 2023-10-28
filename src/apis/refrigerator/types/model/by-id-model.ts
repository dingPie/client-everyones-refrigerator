import { RefrigeratorStatusType } from '@/types/type';

export interface MyRefrigeratorItemType {
  id: number;
  code: string;
  name: string;
  maxCountStoragePerUser: number;
  maxCountParticipant: number | null;
  isShowUserName: boolean;
  status: RefrigeratorStatusType;
}

export type ByIdModel = MyRefrigeratorItemType;
