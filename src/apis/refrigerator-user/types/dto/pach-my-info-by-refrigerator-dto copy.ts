export interface PatchMyInfoByRefrigeratorDto {
  refrigeratorId: number;
  lunchAlertTime: number | null;
  beforeExpireAlertDate: number | null;
  isAlertEtc: boolean;
  isShowExpireDate: boolean;
}
