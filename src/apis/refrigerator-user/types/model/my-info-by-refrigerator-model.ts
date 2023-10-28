import { RefrigeratorUserAuthorityType } from '@/types/type';

export interface MyInfoByRefrigeratorItemType {
  id: number;
  userName: string;
  authority: RefrigeratorUserAuthorityType;
  lunchAlertTime: number | null; // hour
  beforeExpireAlertDate: number | null; // day
  isAlertEtc: boolean;
  isShowExpireDate: boolean;
  user: {
    provider: string;
    userLoginId: string;
  };
}

export type MyInfoByRefrigeratorModel = MyInfoByRefrigeratorItemType;
