import React from 'react';
import {View, Text} from 'react-native';
import AppButton from './../../components/AppButton';
import {useFormContext} from 'react-hook-form';
import Link from './../../components/Link';
import AppRadioField from './../../components/form-components/AppRadioField';
import AppRadioOption from '../../components/AppRadioOption';

import AppFormDatePicker from './../../components/form-components/AppFormDatePicker';
import AppImagePicker from './../../components/form-components/AppImagePicker';
import {colors} from '../../config/config';

const FormSection2 = ({navigation}) => {
  const {
    control,
    formState: {isValid},
    getValues,
  } = useFormContext();

  const gender = getValues('gender');
  const birthdate = getValues('birthdate');

  const handleContinue = () => navigation.navigate('formSection3');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 50,
        backgroundColor: colors.dimBlue,
      }}>
      <AppImagePicker name="profileImage" control={control} />
      <AppRadioField
        name={'gender'}
        required={{required: true}}
        control={control}>
        <AppRadioOption value={'Male'} />
        <AppRadioOption value={'Female'} />
      </AppRadioField>

      <AppFormDatePicker
        dateTextColor={colors.fadeWhite}
        name={'birthdate'}
        control={control}
      />

      <AppButton
        wideButton
        disabled={isValid || (gender && birthdate) ? false : true}
        onPress={handleContinue}
        title="continue"
      />
      <Link text={'go back'} onPress={() => navigation.goBack(1)} />
    </View>
  );
};

export default FormSection2;
