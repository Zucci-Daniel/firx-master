import React from 'react';
import {View} from 'react-native';
import AppButton from './../../components/AppButton';
import {useFormContext} from 'react-hook-form';
import AppRadioField from './../../components/form-components/AppRadioField';
import AppRadioOption from './../../components/AppRadioOption';
import AppSelectField from './../../components/form-components/AppSelectField';
import Link from '../../components/Link';
import {schools} from './../../hooks/utils';

const FormSection3 = ({navigation}) => {
  const handleContinue = () => navigation.navigate('formSection4');

  const {
    control,
    formState: {isValid},
    getValues,
  } = useFormContext();

  const typeOfStudent = getValues('typeOfStudent');
  const school = getValues('school');

  return (
    <View
      style={{
        flex: 1,
        padding: 50,
        justifyContent: 'center',
        backgroundColor: '#010101',
      }}>
      <AppRadioField
        name={'typeOfStudent'}
        required={{required: true}}
        control={control}>
        <AppRadioOption value={'Aspirant'} />
        <AppRadioOption value={'Admitted'} />
      </AppRadioField>

      <AppSelectField
        placeholder="select your school"
        name="school"
        control={control}
        required={{required: 'your school'}}
        data={schools}
      />

      <AppButton
        wideButton
        disabled={isValid || (typeOfStudent && school) ? false : true}
        onPress={handleContinue}
        title="continue"
      />
      <Link text={'go back'} onPress={() => navigation.goBack(1)} />
    </View>
  );
};

export default FormSection3;
