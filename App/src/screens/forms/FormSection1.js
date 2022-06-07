import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AppButton from './../../components/AppButton';
import AppInputField from './../../components/form-components/AppInputField';
import { useFormContext } from 'react-hook-form';
import { colors } from '../../config/config';

const FormSection1 = ({ navigation }) => {
  const handleContinue = () => navigation.navigate('formSection2');

  const {
    control,
    getValues,
    formState: { isValid },
  } = useFormContext();

  const firstName = getValues('firstName');
  const lastName = getValues('lastName');

  return (
    <View
      style={{
        flex: 1,
        padding: 50,
        justifyContent: 'center',
        backgroundColor: colors.black,
      }}>
      <AppInputField
        control={control}
        name="firstName"
        label={'first name'}
        required={{
          required: 'hey...your first name?',
          minLength: { value: 4, message: 'must be more than 4' },
        }}
      />

      <AppInputField
        control={control}
        name="lastName"
        label={'last name'}
        required={{
          required: 'hey...your last name?',
          minLength: { value: 4, message: 'must be more than 4' },
        }}
      />

      <AppButton
        wideButton
        disabled={
          isValid || (firstName.length && lastName.length > 4) ? false : true
        }
        onPress={handleContinue}
        title="continue"
      />
    </View>
  );
};

export default FormSection1;
