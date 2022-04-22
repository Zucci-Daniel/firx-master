import {
  React,
  StyleSheet,
  View,
  useEffect,
  useState,
} from '../../imports/all_RnComponents';
import {
  AppInput,
  InputsGroup,
  AppButton,
  FormTitle,
  Link,
  Lock,
  commonFunctions,
} from '../../imports/all_files';
import {colors, width, universalPadding} from '../../config/config';
import auth from '@react-native-firebase/auth';

import {AppContext} from './../../appContext';
import {useContext} from 'react';
import {getIfDocExist} from '../../hooks/useOperation';
import {storeLocally} from './../../hooks/useLocalStorageFunctions';
import {SignUpInfoContext} from './../forms/signUpInfoContext';
import {log} from './../../hooks/testLog';

//LATER: REFACTOR THIS CODE AND SEPARATE CONCERNS PLEASE!!...
const Confirmation = ({navigation, route, choiceOfAlert = 'Phone Number'}) => {
  const {setUserUID, setSeenUserUID} = useContext(AppContext); //incase there's no userUID in the local storage.

  const {user: signedUp, setUser: setSignedUp} = useContext(SignUpInfoContext); //renamed this due to naming conflict in this file.

  // Set an initializing state while Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [phone, setPhone] = useState(null);
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  //user gon type in confirmation code, i'm holdi'n it here..
  const [code, setCode] = useState('');
  const [user, setUser] = useState();

  const [stopValidation, setStopValidation] = useState(false); //might have to change the name.

  const checkIfUserHasCompletedSignUp = async (id = user['uid']) => {
    const response = await getIfDocExist('STUDENTS', id);
    if (response) {
      log('from the confirmation screen line 46,', 'confirmation page,', id);
      storeLocally('userUID', id);

      return setSeenUserUID(true);
    } else return navigation.reset({index: 0, routes: [{name: 'formStack'}]});
  };

  useEffect(() => {
    console.log('automatically running check');

    //gonna run if real message was sent to that device
    if (user && stopValidation == false) {
      console.log(' the current user ,', user);

      checkIfUserHasCompletedSignUp(user['uid']);
    } else {
      console.log(user, ' the user NOT RUNNING CHECK');
    }
  }, [user, stopValidation]);

  useEffect(() => {
    const {phoneNumber} = route.params;
    setPhone(phoneNumber);
    return () => {};
  }, []);

  useEffect(() => {
    if (phone !== null) {
      signInWithPhoneNumber(phone);
    } else {
      console.log('waiting');
    }
    return () => {};
  }, [phone]);

  useEffect(() => {
    console.log('running auth state changed............');
    if (stopValidation !== true) {
      const subscriber = auth().onAuthStateChanged(onAuthStateChangedCallBack);
      return subscriber; // unsubscribe on unmount
    }
  }, []); //confirm

  function onAuthStateChangedCallBack(user) {
    console.log(' the current user ,', user);
    setUser(user);

    if (initializing) {
      setInitializing(false);
    }
    if (user !== null) {
      //1) get the user obj and store it in context, incase they exit the app during the registration, then they'll start from begining.
      setUserUID(user['uid']);
      setSignedUp({
        ...signedUp,
        phoneNumber: user['phoneNumber'],
      });
      // checkIfUserHasCompletedSignUp(user['uid']);
      setStopValidation(true);
    } else
      log('CANT GO IN!!!!!! automatically, comfirm code first', 'confirmation');
  }

  const signInWithPhoneNumber = async (phoneNumber = phone) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      commonFunctions.showToast("CAN'T RECIEVE TOKEN,", error.message, 'error');
    }
  };

  const confirmCode = async () => {
    try {
      const verifying = await confirm.confirm(code);
      console.log('just verifiying');
      if (verifying) {
        const userObj = {
          ...verifying,
        };
        setStopValidation(true);
        //repeat the below logic for the onAuthStateChanged listener callback func.
        setUserUID(userObj.user['uid']);
        setSignedUp({
          ...signedUp,
          phoneNumber: userObj.user['phoneNumber'],
        });
      }
    } catch (error) {
      commonFunctions.showToast('', 'code is not correct', 'error');
      console.log('Invalid code....', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View id="test" style={styles.padLock}>
        <Lock />
      </View>
      <FormTitle
        title={''}
        subheading={`Enter the code sent to your ${choiceOfAlert}`}
      />
      <InputsGroup>
        <AppInput
          keyboardType="number-pad"
          label="Enter Code"
          onChangeText={text => {
            setCode(text);
          }}
        />
      </InputsGroup>
      <AppButton
        disabled={confirm !== null ? false : true}
        title="Verify"
        wideButton
        onPress={confirmCode}
      />
      <Link text={'re-send code'} onPress={signInWithPhoneNumber} />
      <Link
        text={'edit phone number'}
        onPress={() => navigation.navigate('register')}
      />
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: colors.brandColor,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: universalPadding,
  },
  padLock: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
