import React, { memo, useMemo } from 'react';

import {
  CheckIcon,
  ChevronDownIcon,
  Flex,
  HStack,
  Select,
  Text,
  VStack,
} from 'native-base';

import { UserListByRefrigeratorItemType } from '@/apis/refrigerator-user/types/model/get-user-list-by-refrigerator-model';

import AuthorityBadge from '@/components/#Atoms/AuthorityBadge';
import CustomIcon from '@/components/@common/CustomIcon';

import { LABEL } from '@/constants/label';
import { RefrigeratorUserAuthorityType } from '@/types/type';

interface MemberItemProps {
  memberInfo: UserListByRefrigeratorItemType;
  onChangeMemberAuthority: ({
    userId,
    authority,
  }: Omit<UserListByRefrigeratorItemType, 'id' | 'userName'>) => void;
  isEditAuthority: boolean;
}

const MemberItem = ({
  memberInfo,
  onChangeMemberAuthority,
  isEditAuthority,
}: MemberItemProps) => {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      px="12px"
      py="10px"
      bgColor="white"
      rounded="full"
      shadow={5}
      m="4px"
    >
      <HStack space="16px" alignItems="center">
        <CustomIcon name="User" color="gray.800" size={32} />
        <VStack>
          <Text size="lg.bold" color="gray.800">
            {memberInfo?.userName}
          </Text>
        </VStack>
      </HStack>

      {isEditAuthority ? (
        <Select
          defaultValue={memberInfo.authority}
          onValueChange={(newAuthority) => {
            onChangeMemberAuthority({
              userId: memberInfo.userId,
              authority: newAuthority as RefrigeratorUserAuthorityType,
            });
          }}
          isDisabled={memberInfo.authority === 'admin'}
          placeholder={
            memberInfo.authority === 'admin' ? '어드민' : '승인 대기'
          }
          dropdownIcon={<ChevronDownIcon size="4" mr="8px" />}
          size="md"
          width="120px"
          h="40px"
          bgColor="white"
          color="gray.800"
          borderColor="gray.400"
          _selectedItem={{
            bg: 'gray.100',
            endIcon: <CheckIcon size="5" />,
          }}
          _actionSheetContent={{
            color: 'gray.900',
            bgColor: 'white',
          }}
          _item={{
            _text: {
              color: 'black',
            },
            bgColor: 'white',
          }}
        >
          {/* P_MEMO: master, 대기중은 수정할 수 없음. */}
          {Object.entries(LABEL.USER.AUTHORITY)
            .slice(1, 3)
            .map(([value, label]) => {
              return <Select.Item key={value} label={label} value={value} />;
            })}
        </Select>
      ) : (
        <AuthorityBadge authority={memberInfo.authority} />
      )}
    </HStack>
  );
};

export default memo(MemberItem);
