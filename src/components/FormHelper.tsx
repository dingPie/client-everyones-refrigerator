import React from 'react';

import { StyleSheet } from 'react-native';

import {
  FormControl,
  IFormControlErrorMessageProps,
  IFormControlHelperTextProps,
  IFormControlLabelProps,
} from 'native-base';
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormStateReturn,
} from 'react-hook-form';

import { IFormControlProps } from 'native-base/lib/typescript/components/composites/FormControl/types';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';

type CustomControllerRenderType<T extends FieldValues> = (args: {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<T>;
}) => JSX.Element;
interface FormHelperProps<T extends FieldValues>
  extends InterfaceBoxProps<IFormControlProps> {
  helperText?: string | JSX.Element;
  errorText?: string | JSX.Element | JSX.Element[];
  successText?: string | JSX.Element;
  label?: string;
  control: Control<T, unknown>;
  name: Path<T>;

  children: JSX.Element | JSX.Element[] | CustomControllerRenderType<T>;
  labelProps?: IFormControlLabelProps;
  successTextProps?: IFormControlHelperTextProps;
  helperTextProps?: IFormControlHelperTextProps;
  errorTextProps?: IFormControlErrorMessageProps;
}

/**
 * NativeBase 의 FormControll 를 Wrapping 하여 Label, Error Text, Success Text 등을 추가로 넘겨 줄수 있는 컴포넌트입니다.
 *
 * NativeBase FormControl 은
 * NativeBase 의 Form Element 를 children 으로 받아, isInvalid, isDisabled, isRequired 와 같은 상태를
 * 자식 NativeBase Form Component 에게 Context 로 전달해줍니다.
 *
 * @see https://chakra-ui.com/docs/components/form/form-control
 * */
function FormHelper<T extends FieldValues>({
  //
  helperText,
  errorText,
  successText,
  children,
  label,
  control,
  name,

  labelProps,
  successTextProps,
  helperTextProps,
  errorTextProps,

  ...basisProps
}: FormHelperProps<T>) {
  const isShowErrorText = !!errorText;
  const isShowSuccessText = !!successText && !isShowErrorText;
  const isShowHelper = !!helperText && !isShowErrorText && !isShowErrorText;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <FormControl isInvalid={!!errorText} {...basisProps}>
          {!!label && (
            <FormControl.Label
              mb="10px"
              _text={{
                ...styles.formText,
              }}
              {...labelProps}
            >
              {label}
            </FormControl.Label>
          )}
          {typeof children === 'function'
            ? children({ field, fieldState, formState })
            : children}
          {isShowErrorText && (
            <FormControl.ErrorMessage
              _text={{
                ...styles.formErrorText,
              }}
              {...errorTextProps}
            >
              {errorText}
            </FormControl.ErrorMessage>
          )}
          {isShowSuccessText && (
            <FormControl.HelperText
              color="custom.primary"
              _text={{
                ...styles.formText,
              }}
              {...successTextProps}
            >
              {successText}
            </FormControl.HelperText>
          )}
          {isShowHelper && (
            <FormControl.HelperText
              _text={{
                ...styles.formText,
              }}
              {...helperTextProps}
            >
              {helperText}
            </FormControl.HelperText>
          )}
        </FormControl>
      )}
    />
  );
}

export default FormHelper;

const styles = StyleSheet.create({
  formText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 'bold',
    color: 'gray.600',
  },
  formErrorText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: 'warning.500',
  },
});
