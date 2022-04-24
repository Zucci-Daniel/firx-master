import {
  React,
  StyleSheet,
  View,
  ScrollView,
  useEffect,
} from '../../../../imports/all_RnComponents';
import {
  AppButton,
  config,
  AppTextArea,
  AppInput2,
  AppImage,
} from '../../../../imports/all_files';
import {Avatar, IconButton, Colors} from '../../../../imports/all_packages';
import {SignUpInfoContext} from '../../../forms/signUpInfoContext';
import {useContext, useState} from 'react';
import Link from './../../../../components/Link';
import {updateDocument} from '../../../../hooks/useOperation';
import {useUploadFile} from './../../../../hooks/useUploadFile';
import {AppContext} from './../../../../appContext';

const {universalPadding, colors} = config;

const EditProfile = ({navigation}) => {
  const uploadFile = useUploadFile();
  const {userUID} = useContext(AppContext);

  const {user, setUser, didUpdateBasicInfo, setDidUpdateBasicInfo} =
    useContext(SignUpInfoContext);
  const {
    birthdate,
    department,
    firstName,
    gender,
    lastName,
    level,
    phoneNumber,
    profileImage,
    school,
    typeOfStudent,
  } = user;

  const [updatedInfo, setUpdatedInfo] = useState({
    firstName,
    lastName,
  });

  console.log('first question, did the state update?', didUpdateBasicInfo);

  var isEqual = (...objects) =>
    objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));

  const handleUpdateProfile = () => {
    // console.log(updatedInfo, ' ready to update in firestore', userUID);
    updateDocument(userUID, 'STUDENTS', updatedInfo);
    setUser({...user, ...updatedInfo});
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.wrapper}>
          <AppImage />
        </View>
        <View style={styles.inputWrapper}>
          <AppInput2
            value={updatedInfo.firstName}
            showIcon={false}
            placeholder={'first name'}
            onChange={text => setUpdatedInfo({...updatedInfo, firstName: text})}
          />
          <AppInput2
            value={updatedInfo.lastName}
            showIcon={false}
            placeholder="last name"
            onChange={text => setUpdatedInfo({...updatedInfo, lastName: text})}
          />
          <AppTextArea
            showShadow={false}
            placeHolder={'click to write a short note about your status'}
          />

          {/* <AppInput2 iconName="logo-instagram" />
          <AppInput2 iconName="logo-twitter" />
          <AppInput2 iconName="logo-facebook" /> */}
        </View>

        <View style={styles.inputWrapper}>
          <AppInput2
            iconName="mail-open-outline"
            placeholder="Register email"
          />
        </View>
      </ScrollView>
      <Link text="update" onPress={handleUpdateProfile} />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: universalPadding / 2,
    alignItems: 'center',
  },
  wrapper: {
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    bottom: -40,
    right: 25,
  },
  inputWrapper: {
    width: '100%',
    marginTop: universalPadding,
  },
});
