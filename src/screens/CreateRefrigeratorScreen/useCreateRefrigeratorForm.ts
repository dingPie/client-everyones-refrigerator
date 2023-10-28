import { UseFormProps, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { REFRIGERATOR_SPACE } from '@/constants/const';
import { regex } from '@/utils/regex';

export interface CreateRefrigeratorFormDataType {
  name: string;
  code?: string;
  userName: string;
  maxCountStoragePerUser: number;
  maxStoragePeriod: number;
  isShowUserName: boolean;
  refrigeratorSpaceList: {
    name: string;
    maxCountPerSpace: number;
    // maxStoragePeriod: number;
    purposeType: string;
    shapeType: string;
  }[];
}

export const emptyRefrigeratorSpaceItem = {
  name: '',
  maxCountPerSpace: 0,
  purposeType: REFRIGERATOR_SPACE.PURPOSE_TYPE.REFRIGERATION,
  shapeType: REFRIGERATOR_SPACE.SHAPE_TYPE.SHELF,
};

const refrigeratorSpaceSchema = yup.object({
  name: yup.string().required('이 칸 이름을 설정해주세요'),
  maxCountPerSpace: yup
    .number()
    .required('이 칸의 최대 보관 갯수를 설정해주세요.'),
  purposeType: yup.string().required('이 칸의 보관 유형을 설정해주세요.'),
  shapeType: yup.string().required('이 칸의 형태를 설정해주세요.'),
});

export const createRefrigeratorFormSchema = yup.object({
  name: yup.string().required('냉장고 그룹의 이름이 필요합니다.'),
  code: yup.string().matches(regex.createRefrigeratorCode, {
    message: '6자리 대문자 코드를 입력해주세요.',
    excludeEmptyString: true,
  }), // P_MEMO: 얘는 없으면 자동생성
  userName: yup.string().required('이 그룹의 내 이름을 설정해주세요.'),
  maxCountStoragePerUser: yup
    .number()
    .required('최대 보관일 설정이 필요합니다.'),
  maxStoragePeriod: yup.number().required('최대 보관 갯수를 설정해주세요.'), // P_MEMO: 이건 받아서 각 칸당 설정해줘야 함.
  isShowUserName: yup.bool().required(),
  refrigeratorSpaceList: yup
    .array()
    .of(refrigeratorSpaceSchema)
    .required('필수 값을 입력해주세요.'),
});

const useCreateRefrigeratorForm = (
  options?: UseFormProps<CreateRefrigeratorFormDataType>,
) => {
  return useForm<CreateRefrigeratorFormDataType>({
    resolver: yupResolver(createRefrigeratorFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      code: '',
      userName: '',
      maxCountStoragePerUser: 0,
      maxStoragePeriod: 0,
      isShowUserName: false,
      refrigeratorSpaceList: [emptyRefrigeratorSpaceItem],
    },
    ...options,
  });
};
export default useCreateRefrigeratorForm;
