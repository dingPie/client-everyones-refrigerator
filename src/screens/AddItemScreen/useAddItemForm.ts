import { UseFormProps, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { CreateDto } from '@/apis/item/types/dto/create-dto';

export interface AddItemDataType
  extends Omit<CreateDto, 'refrigeratorSpaceId' | 'quantity'> {
  refrigeratorSpaceId: string;
  quantity: string;
}

export const addItemFormSchema = yup.object({
  name: yup.string().required('상품 이름을 입력해주세요.'),
  imgUrl: yup.string().required('보여줄 아이콘을 선택해주세요.'), // P_MEMO: 얘는 없으면 default set
  quantity: yup.string().required('1개 이상의 갯수 설정이 필요해요.'),
  refrigeratorSpaceId: yup.string().required('추가할 공간을 설정해야 해요.'),
  memo: yup.string(),
  ownerName: yup.string(),
});

const useAddItemForm = (options?: UseFormProps<AddItemDataType>) => {
  return useForm<AddItemDataType>({
    resolver: yupResolver(addItemFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      imgUrl: '',
      quantity: '1',
      refrigeratorSpaceId: '',
      memo: '',
      ownerName: '',
    },
    ...options,
  });
};
export default useAddItemForm;
