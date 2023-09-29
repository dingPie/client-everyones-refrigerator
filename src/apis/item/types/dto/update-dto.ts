import { ItemStatusType } from '@/types/type';

export interface UpdateDto {
  itemInfoId: number;
  quantity: number;
  status: ItemStatusType;
}
