export interface CreateDto {
  name: string;
  imgUrl: string;
  quantity: number;
  refrigeratorSpaceId: number;
  memo?: string;
  ownerName?: string;
}
