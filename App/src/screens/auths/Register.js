import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FormTitle from './../../components/FormTitle';
import InputsGroup from './../../components/InputsGroup';
import PhoneInput from 'react-native-phone-number-input';
import AppButton from './../../components/AppButton';
import { colors, universalPadding, width } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import { FingerIdAccessIcon } from '../../imports/images';
import { checkIfSignatureExist, _authenticateWithExistingKey, _createAnewBiometricKey } from '../../hooks/operations';
import Link from '../../components/Link';
import { AppContext } from '../../appContext';
import auth from '@react-native-firebase/auth';

const Register = ({ navigation }) => {

  const { setUserUID, setSeenUserUID } = useContext(AppContext); //incase there's no userUID in the local storage.

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);


  const [biometricEnabled, setBiometricEnabled] = useState(null)
  const [userCredentials, setUserCredentials] = useState({})
  const [credentialsSavedBefore, setCredentialsSavedBefore] = useState(null)

  const phoneInput = useRef(null);




  useEffect(() => {
    console.log('checkign..')
    confirmIfUserEnabledBiometric()
    checkIfCredentialsWasSaved()
  }, [])

  const confirmIfUserEnabledBiometric = async () => {
    try {
      const response = await AsyncStorage.getItem('userHasEnabledBiometric');
      if (response == 'true') {
        setBiometricEnabled(true)
      }
      else {
        setBiometricEnabled(false)
      }

    } catch (error) {
      console.log(error, ' failed to confirm if user enabled biometric')
    }
  }

  const checkIfCredentialsWasSaved = async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      var userCred = JSON.parse(credentials.password)

      setUserCredentials({ ...userCred })

      setCredentialsSavedBefore(true)
    } else {
      console.log('No credentials stored');
      setCredentialsSavedBefore(false)

    }
  }
  const handleAuthWithExistingKey = async () => {
    await _authenticateWithExistingKey(login, () => null, errorFeedback)
  }

  const handleCreateNewBiometricKey = () => {
    _createAnewBiometricKey(handleAuthWithExistingKey, () => null, () => null)
  }

  const handleBiometrics = async () => {
    const keysExist = await checkIfSignatureExist()

    if (keysExist) {
      handleAuthWithExistingKey()
    } else {
      handleCreateNewBiometricKey()
    }
  }


  const login = async () => {
    try {
      console.log(userCredentials, ' before')

      const testCred = auth.PhoneAuthProvider.credential();
      console.log(testCred, 'test')
      await auth().signInWithCredential(userCredentials)

      console.log(userCredentials, ' bllaa')
      setUserUID(userCredentials);
      setSeenUserUID(true)

    } catch (error) {
      console.log(error)
    }
  }
  const errorFeedback = () => console.log('failed to log in')


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

      <Link text={'use fingerprint?'} />
      <TouchableOpacity activeOpacity={.6} onPress={() => handleBiometrics()} style={{ alignSelf: 'center' }}>
        <FingerIdAccessIcon width={70} />
      </TouchableOpacity>

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
