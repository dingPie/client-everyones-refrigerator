import { ItemStatusType } from '@/types/type';

export interface ListByStatusDto {
  refrigeratorId: number;
  status: ItemStatusType;
}
