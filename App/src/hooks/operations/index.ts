import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

export const detectBiometrics = async () => {
  try {
    const {biometryType, error, available} =
      await ReactNativeBiometrics.isSensorAvailable();
    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      return 'TouchID';
    } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
      return 'FaceID';
    } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      return 'TouchID';
    } else if (biometryType === undefined) {
      console.log('none of these biometrics are supported.');
      return '';
    }
    if (error) {
      console.log('biometric failed, operation line 23: ', error);
      return 'error';
    }
  } catch (error) {
    console.log(
      'generic failure while detecting biometrics, operation line 27: ',
    );
    return 'error';
  }
};

export const _authenticateWithExistingKey = async (
  firstAction: () => void,
  secondAction: () => void,
  errorAction: () => void,
) => {
  let payload = 'create a signature date to be sent to the server.';
  ReactNativeBiometrics.createSignature({
    promptMessage: 'Your Fingerprint Please.',
    payload: payload,
  }).then(resultObject => {
    const {success, signature, error} = resultObject;

    if (success) {
      secondAction();
      firstAction();
      //store the userEnabledBiometric in the local storage.
      AsyncStorage.setItem('userHasEnabledBiometric', 'true');
    }
    if (error) {
      console.log('error validating! ');
      errorAction();
    }
  });
};

// const storeSomethingToKeyStore = async () => {};

export const _createAnewBiometricKey = async (
  firstAction: () => void,
  secondAction: () => void,
  finalAction: () => void,
) => {
  ReactNativeBiometrics.createKeys()
    .then((resultObject: any) => {
      //request for thier signature again.
      firstAction();
      secondAction();
      finalAction();
    })
    .catch(() => {
      secondAction();
      Alert.alert(
        'Error',
        'Authentication could not start because Touch ID has no enrolled fingers',
        [{text: 'Okay', onPress: () => finalAction()}],
      );
    });
};

export const checkIfSignatureExist = async () => {
  const {keysExist} = await ReactNativeBiometrics.biometricKeysExist();
  return keysExist;
};
