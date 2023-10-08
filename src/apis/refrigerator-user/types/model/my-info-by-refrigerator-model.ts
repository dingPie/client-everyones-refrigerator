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
    provider: 'google.com';
    userLoginId: 'cpie1216@gmail.com';
  };
}

export type MyInfoByRefrigeratorModel = MyInfoByRefrigeratorItemType;
