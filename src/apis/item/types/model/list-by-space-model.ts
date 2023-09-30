export interface ItemInfoItemType {
  id: number;
  name: string;
  expireDate: Date | string;
  ownerName?: string;
  imgUrl: string;
  memo?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  userId: number;
  storage_quantity: number;
  refrigeratorSpaceId: number;
}

export type ListBySpaceModel = ItemInfoItemType[];
