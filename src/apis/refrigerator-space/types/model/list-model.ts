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
}

export type ListModel = RefrigeratorSpaceItemType[];
