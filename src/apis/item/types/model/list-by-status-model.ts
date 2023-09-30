import { ItemStatusType } from '@/types/type';

import { ItemInfoItemType } from './list-by-space-model';

export interface ItemWithStatusItemType {
  id: number;
  status: ItemStatusType;
  refrigeratorId: number;
  itemInfo: ItemInfoItemType;
}

export type ListByStatusDtoModel = ItemWithStatusItemType[];
