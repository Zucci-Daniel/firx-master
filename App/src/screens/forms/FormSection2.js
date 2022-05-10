import React from 'react';
import {View, Text} from 'react-native';
import AppButton from './../../components/AppButton';
import AppInputField from './../../components/form-components/AppInputField';
import {useFormContext} from 'react-hook-form';
import Link from './../../components/Link';
import AppRadioField from './../../components/form-components/AppRadioField';
import AppRadioOption from '../../components/AppRadioOption';
import AppSelectField from '../../components/form-components/AppSelectField';
import AppDatePicker from './../../components/AppDatePicker';
import AppFormDatePicker from './../../components/form-components/AppFormDatePicker';
import AppImage from '../../components/AppImage';
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
        backgroundColor: '#010101',
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
