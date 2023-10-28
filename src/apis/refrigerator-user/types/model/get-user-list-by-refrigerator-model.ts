import { RefrigeratorUserAuthorityType } from '@/types/type';

export interface UserListByRefrigeratorItemType {
  id: number;
  userName: string;
  authority: RefrigeratorUserAuthorityType;
  userId: number;
}

export type GetUserListByRefrigeratorModel = {
  userList: UserListByRefrigeratorItemType[];
};
