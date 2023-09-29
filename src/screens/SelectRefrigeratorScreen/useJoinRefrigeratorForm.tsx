import { UseFormProps, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { regex } from '@/utils/regex';

export interface JoinRefrigeratorFormDataType {
  userName: string;
  refrigeratorCode: string;
}

export const joinRefrigeratorFormSchema = yup.object({
  userName: yup.string().required('이 냉장고에서 사용할 이름을 입력해주세요.'),
  refrigeratorCode: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .matches(regex.refrigeratorCode, '냉장고 코드 형식과 일치하지 않습니다.'),
});

const useJoinRefrigeratorForm = (
  options?: UseFormProps<JoinRefrigeratorFormDataType>,
) => {
  return useForm<JoinRefrigeratorFormDataType>({
    resolver: yupResolver(joinRefrigeratorFormSchema),
    mode: 'all',
    defaultValues: {
      refrigeratorCode: '',
      userName: '',
    },
    ...options,
  });
};
export default useJoinRefrigeratorForm;
