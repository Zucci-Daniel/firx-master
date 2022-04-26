import React from 'react';
import {View, Text} from 'react-native';
import {Controller} from 'react-hook-form';
import AppInput from '../AppInput';

const AppInputField = ({control, name, label, required = {}, background}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={required}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <AppInput
            background={background}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            label={label}
          />
          {error && (
            <Text style={{color: error ? 'red' : 'green'}}>
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default AppInputField;
