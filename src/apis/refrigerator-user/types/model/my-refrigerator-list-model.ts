import { RefrigeratorUserAuthorityType } from '@/types/type';

export interface MyRefrigeratorItemType {
  authority: RefrigeratorUserAuthorityType; // P_TODO: authrity 타입으로 바꾸자.
  refrigerator: {
    id: number;
    name: string;
  };
}

export interface MyRefrigeratorListModel {
  myRefrigeratorList: MyRefrigeratorItemType[];
}
