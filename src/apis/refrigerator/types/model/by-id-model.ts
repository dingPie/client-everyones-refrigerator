import { RefrigeratorStatusType } from '@/types/type';

export interface ByIdModel {
  id: number;
  code: string;
  name: string;
  maxCountStoragePerUser: number;
  maxCountParticipant: number | null;
  isShowUserName: boolean;
  status: RefrigeratorStatusType;
}
