import { ItemStatusType } from '@/types/type';

import { ItemInfoItemType } from './list-by-space-model';

export interface ItemWithStatusItemType {
  id: number;
  status: ItemStatusType;
  refrigeratorId: number;
  itemInfo: {
    id: number;
    name: string;
    expireDate: Date | string;
    imgUrl: string;
    memo?: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
}

export type ListByStatusDtoModel = ItemWithStatusItemType[];
