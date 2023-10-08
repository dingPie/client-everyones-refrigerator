import { ItemStatusType } from '@/types/type';
import { WithPaginationParams } from '@/types/utility/with-pagination-params';

export interface ListByStatusDto {
  refrigeratorId: number;
  status: ItemStatusType;
}

export type ListByStatusWithPaginationDto =
  WithPaginationParams<ListByStatusDto>;
