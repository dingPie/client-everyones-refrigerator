import { RefrigeratorUserAuthorityType } from '@/types/type';

export interface AuthorityDto {
  userId: number;
  refrigeratorId: number;
  authority: RefrigeratorUserAuthorityType;
}
