import React, { memo } from 'react';

import { Flex, Text } from 'native-base';
import { Controller, useFormContext } from 'react-hook-form';

import CustomInput, { CustomInputProps } from '../#Atoms/CustomInput';

interface CustomInputControllerProps extends CustomInputProps {
  keyName: string;
  isShowError?: boolean;
}

const CustomInputController = ({
  keyName,
  isShowError = true,
  ...props
}: CustomInputControllerProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Flex flex={1} h="100%">
      <Controller
        name={keyName}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <CustomInput
              placeholder="AAAAAA_1"
              value={value}
              onChangeText={onChange}
              {...props}
            />
          );
        }}
      />
      {!!errors?.[keyName] && isShowError && (
        <Text size="sm" color="warning.500" mt="4px">
          {errors?.[keyName]?.message as string}
        </Text>
      )}
    </Flex>
  );
};

export default memo(CustomInputController);
