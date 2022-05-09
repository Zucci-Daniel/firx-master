import React from 'react';
import {View, Text} from 'react-native';
import {Controller} from 'react-hook-form';
import AppDatePicker from './../AppDatePicker';

const AppFormDatePicker = ({control, name, label, required = {}}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={required}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <AppDatePicker
            value={value}
            label={label}
            getDate={date => onChange(date)}
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

export default AppFormDatePicker;
