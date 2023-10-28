import { UseFormProps, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { UpdateDto } from '@/apis/refrigerator/types/dto/update-dto';

import { regex } from '@/utils/regex';

export interface EditRefrigeratorDataType
  extends Omit<Required<UpdateDto>, 'id'> {}

export const editRefrigeratorSchema = yup.object({
  name: yup.string().required(),
  code: yup.string().required().matches(regex.createRefrigeratorCode, {
    message: '6자리 대문자 코드를 입력해주세요.',
    excludeEmptyString: true,
  }),
  isShowUserName: yup.boolean().required(),
});

const useEditRefrigeratorForm = (
  options?: UseFormProps<EditRefrigeratorDataType>,
) => {
  return useForm<EditRefrigeratorDataType>({
    resolver: yupResolver(editRefrigeratorSchema),
    mode: 'onChange',
    ...options,
  });
};
export default useEditRefrigeratorForm;
