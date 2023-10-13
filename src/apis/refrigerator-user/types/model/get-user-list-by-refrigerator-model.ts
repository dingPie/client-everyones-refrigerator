export interface UserListByRefrigeratorItemType {
  id: number;
  userName: string;
  authority: string;
}

export type GetUserListByRefrigeratorModel = {
  userList: UserListByRefrigeratorItemType[];
};
