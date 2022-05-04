import React from 'react';
import {View, Text} from 'react-native';
import {Controller} from 'react-hook-form';
import AppInput from '../AppInput';
import {colors} from '../../config/config';

const AppInputField = ({
  control,
  name,
  label,
  required = {},
  background,
  extraStyle,
  textColor,
  keyboardType,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={required}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <AppInput
            textColor={textColor}
            extraStyles={extraStyle}
            background={background}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            label={label}
            keyboardType={keyboardType}
          />
          {error && (
            <Text style={{color: error ? colors.calmRed : colors.calmGreen}}>
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default AppInputField;
