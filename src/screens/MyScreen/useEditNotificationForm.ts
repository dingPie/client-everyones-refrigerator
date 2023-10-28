import { UseFormProps, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { MyInfoByRefrigeratorItemType } from '@/apis/refrigerator-user/types/model/my-info-by-refrigerator-model';

// extends Omit<
//     MyInfoByRefrigeratorItemType,
//     'id' | 'userName' | 'authority' | 'user'
//   >
export interface EditNotificationDataType {
  lunchAlertTime: number | null; // hour
  beforeExpireAlertDate: number | null; // day
  isAlertEtc: boolean;
  isShowExpireDate: boolean;
}

export const editNotificationSchema = yup.object({
  lunchAlertTime: yup.number().required().nullable(),
  beforeExpireAlertDate: yup.number().required().nullable(),
  isAlertEtc: yup.boolean().required(),
  isShowExpireDate: yup.boolean().required(),
});

const useEditNotificationForm = (
  options?: UseFormProps<EditNotificationDataType>,
) => {
  return useForm<EditNotificationDataType>({
    resolver: yupResolver(editNotificationSchema),
    mode: 'onChange',
    defaultValues: {
      lunchAlertTime: null,
      beforeExpireAlertDate: null,
      isAlertEtc: false,
      isShowExpireDate: false,
    },
    ...options,
  });
};
export default useEditNotificationForm;
