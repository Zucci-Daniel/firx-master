import React from 'react';
import {View, Text} from 'react-native';
import {Controller} from 'react-hook-form';
import AppInput from '../AppInput';
import { colors } from '../../config/config';

const AppInputField = ({
  control,
  name,
  label,
  required = {},
  background,
  extraStyle,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={required}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <AppInput
            extraStyles={extraStyle}
            background={background}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            label={label}
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
