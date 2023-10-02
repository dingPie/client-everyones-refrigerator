import { ItemInfoItemType } from '@/apis/item/types/model/list-by-space-model';

import {
  RefrigeratorSpacePurposeTypeType,
  RefrigeratorSpaceShapeTypeType,
} from '@/types/type';

export interface RefrigeratorSpaceItemType {
  id: number;
  name: string;
  maxCountPerSpace: number;
  maxStoragePeriod: number;
  purposeType: RefrigeratorSpacePurposeTypeType;
  shapeType: RefrigeratorSpaceShapeTypeType;
  itemInfoList: ItemInfoItemType[]; // P_TODO; 추후 받아오는 데이터 간소화 할 수도 있음.
}

export type ListWithItemModel = RefrigeratorSpaceItemType[];
