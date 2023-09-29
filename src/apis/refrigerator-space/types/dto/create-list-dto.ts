import { RefrigeratorSpaceItemType } from '../model/list-model';

export interface CreateListDto {
  refrigeratorId: number;
  refrigeratorSpaceList: Omit<RefrigeratorSpaceItemType, 'id'>[];
}
