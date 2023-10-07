import { WithPaginationParams } from '@/types/utility/with-pagination-params';

export interface ListBySpaceDto {
  refrigeratorSpaceId: number;
  isMine?: boolean;
}

export type ListBySpaceWithPaginationDto = WithPaginationParams<ListBySpaceDto>;
