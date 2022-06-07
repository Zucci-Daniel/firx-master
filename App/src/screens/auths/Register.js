import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import FormTitle from './../../components/FormTitle';
import InputsGroup from './../../components/InputsGroup';
import PhoneInput from 'react-native-phone-number-input';
import AppButton from './../../components/AppButton';
import { colors, universalPadding, width } from '../../config/config';

const Register = ({ navigation }) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);

  const handleSubmit = () =>
    navigation.navigate('confirmation', { phoneNumber: formattedValue });

  return (
    <View style={styles.container}>
      <FormTitle title={'Enter Phone Number'} subheading="" color="black" />
      <InputsGroup>
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="NG"
          layout="first"
          onChangeText={text => {
            setValue(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          withDarkTheme
          withShadow={false}
          autoFocus
        />
      </InputsGroup>
      <AppButton
        wideButton
        disabled={value.length > 9 ? false : true}
        title="Send Verification Code"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: colors.brandColor,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: universalPadding,
  },
});
