import React, { memo } from 'react';

import {
  Box,
  Button,
  CheckIcon,
  ChevronDownIcon,
  HStack,
  Pressable,
  Select,
  Switch,
  Text,
  VStack,
} from 'native-base';
import { Controller, useFormContext } from 'react-hook-form';

import { MyInfoByRefrigeratorItemType } from '@/apis/refrigerator-user/types/model/my-info-by-refrigerator-model';

import {
  BEFORE_EXPIRE_ALERT_DATE_LIST,
  LUNCH_ALERT_TIME_LIST,
} from '@/constants/const';

import { EditNotificationDataType } from '../../useEditNotificationForm';

interface NotificationWrapperProps {
  onPressSaveEditNotificationButton: () => void;
}

const NotificationWrapper = ({
  onPressSaveEditNotificationButton,
}: NotificationWrapperProps) => {
  const method = useFormContext<EditNotificationDataType>();
  const { control } = method;

  return (
    <VStack space="12px">
      <HStack
        justifyContent="space-between"
        alignItems="center"
        bgColor="white"
        px="8px"
        py="12px"
        borderRadius="8px"
      >
        <Text size="xl.bold">알림설정</Text>
        <Button onPress={onPressSaveEditNotificationButton} size="sm">
          <Text size="md.bold" color="white" px="12px">
            저장하기
          </Text>
        </Button>
      </HStack>

      {/* 점심시간 알림 Toggle, Select */}
      <VStack space="8px" bgColor="white" px="8px" py="12px" borderRadius="8px">
        <HStack justifyContent="space-between" alignItems="center">
          <Text size="lg.bold">점심시간 알림</Text>
          <Controller
            name="lunchAlertTime"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <Switch
                    size="lg"
                    value={!!value}
                    onChange={() => {
                      onChange(!value ? 12 : null);
                    }}
                  />
                </>
              );
            }}
          />
        </HStack>

        <HStack alignItems="center" space="8px" px="8px">
          <Text>매일</Text>
          <Controller
            name="lunchAlertTime"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  selectedValue={value?.toString()}
                  onValueChange={onChange}
                  size="md"
                  minWidth="80px"
                  h="40px"
                  isDisabled={!value}
                  bgColor="white"
                  placeholder="12"
                  dropdownIcon={<ChevronDownIcon size="4" mr="8px" />}
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
                  {LUNCH_ALERT_TIME_LIST.map((hour) => {
                    return (
                      <Select.Item
                        key={hour}
                        label={hour.toString()}
                        value={hour.toString()}
                        py="8px"
                      />
                    );
                  })}
                </Select>
              );
            }}
          />
          <Text>시에 점심 알림이 갈 거에요.</Text>
        </HStack>
      </VStack>

      {/* 만료알림 Toggle, Select */}
      <VStack space="8px" bgColor="white" px="8px" py="12px" borderRadius="8px">
        <HStack justifyContent="space-between" alignItems="center">
          <Text size="lg.bold">상품 만료 알림</Text>
          <Controller
            name="beforeExpireAlertDate"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <Switch
                    size="lg"
                    value={!!value}
                    onChange={() => {
                      onChange(!value ? 1 : null);
                    }}
                  />
                </>
              );
            }}
          />
        </HStack>
        <HStack alignItems="center" space="8px" px="8px">
          <Text>상품 만료</Text>
          <Controller
            name="beforeExpireAlertDate"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  selectedValue={value?.toString()}
                  onValueChange={onChange}
                  size="md"
                  minWidth="80px"
                  h="40px"
                  isDisabled={!value}
                  bgColor="white"
                  placeholder="1일"
                  dropdownIcon={<ChevronDownIcon size="4" mr="8px" />}
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
                  {BEFORE_EXPIRE_ALERT_DATE_LIST.map((date) => {
                    return (
                      <Select.Item
                        key={date}
                        label={date.toString() + '일'}
                        value={date.toString()}
                        py="8px"
                      />
                    );
                  })}
                </Select>
              );
            }}
          />
          <Text>전 9시에 알림이 갈 거에요.</Text>
        </HStack>
      </VStack>

      {/* 기타알림여부 */}
      <VStack space="8px" bgColor="white" px="8px" py="12px" borderRadius="8px">
        <HStack justifyContent="space-between" alignItems="center">
          <Text size="lg.bold">기타 알림</Text>
          <Controller
            name="isAlertEtc"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <Switch
                    size="lg"
                    value={value}
                    onChange={() => onChange(!value)}
                  />
                </>
              );
            }}
          />
        </HStack>
      </VStack>

      {/* 기타알림여부 */}
      {/* P_TODO: 만료일 노출 여부는 아직 넣지 말자. */}
      {/* <HStack bgColor="white" px="8px" py="12px" borderRadius="8px">
        <Text size="xl.bold">표시 설정</Text>
      </HStack>

      <VStack space="8px" bgColor="white" px="8px" py="12px" borderRadius="8px">
        <HStack justifyContent="space-between" alignItems="center">
          <Text size="lg.bold">홈에서 만료일 확인</Text>
          <Controller
            name="isShowExpireDate"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <Switch
                    size="lg"
                    value={value}
                    onChange={() => onChange(!value)}
                  />
                </>
              );
            }}
          />
        </HStack>
      </VStack> */}
    </VStack>
  );
};

export default memo(NotificationWrapper);
