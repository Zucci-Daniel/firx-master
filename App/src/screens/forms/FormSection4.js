import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import AppButton from './../../components/AppButton';
import {useFormContext} from 'react-hook-form';
import AppSelectField from './../../components/form-components/AppSelectField';
import {SignUpInfoContext} from './signUpInfoContext';
import {AppContext} from './../../appContext';
import {storeLocally} from './../../hooks/useLocalStorageFunctions';
import {addNewUserToDb} from './../../hooks/useOperation';
import {commonFunctions} from '../../imports/all_files';
import {log} from './../../hooks/testLog';
import Link from './../../components/Link';
import {useNetInfo} from '@react-native-community/netinfo';
import {departments, levels} from '../../hooks/utils';
import {uploadAFile} from '../../hooks/uploadAfile';
import MediaSkeleton from '../../components/MediaSkeleton';

//refactor later

const FormSection4 = ({navigation}) => {
  const netInfo = useNetInfo();

  const page = 'formstack4';
  const {setSeenUserUID, userUID} = useContext(AppContext);

  const {user, setUser} = useContext(SignUpInfoContext);

  const [progress, setProgress] = useState(null);
  const [creatingStudent, setIsCreatingStudent] = useState(false);

  let currentNetworkStat = netInfo.isInternetReachable;

  const submitTheForm = async data => {
    if (currentNetworkStat) {
      try {
        setIsCreatingStudent(true);
        log(data, page, ' final data');

        const theUrl = data.profileImage
          ? await uploadAFile(data.profileImage)
          : 'NO PROFILE IMAGE';

        setProgress(setProgress);
        //upload the image on this screen
        //DANIEL THIS MIGHT NOT BE NECCESSARY,THINK ABOUT THIS LATER.
        setUser({
          ...user,
          birthdate: data.birthdate,
          department: data.department,
          firstName: data.firstName,
          gender: data.gender,
          lastName: data.lastName,
          level: data.level,
          school: data.school,
          typeOfStudent: data.typeOfStudent,
          profileImage: theUrl,
          profileImageLocalPath: data.profileImage,
        });
        console.log(
          ' to chck the local path just ',
          user.profileImageLocalPath,
        );
        //prepare data to send to firestore
        //u cant use the state context value in the same function you are setting it., that's y u should prepare the data.

        //don't store all this object in the local storage, take the important ones
        const newUser = {
          id: userUID,
          birthdate: data.birthdate,
          department: data.department,
          firstName: data.firstName,
          gender: data.gender,
          lastName: data.lastName,
          level: data.level,
          school: data.school,
          typeOfStudent: data.typeOfStudent,
          profileImage: theUrl,
          profileImageLocalPath: data.profileImage,
          phoneNumber: user.phoneNumber, //already taken before in confirmation screen.
          interests: [],
          personalities: [],
          hobbies: [],
          username: null,
          bio: null,
          postsLiked: [],
          postsSaved: [],
          postsPushes: [],
          socialHandles: [],
          postsBlackListed: [],
          profilesBlackListed: [],
          following: [],
          followers: [],
          hideMeFrom: [],
        };

        try {
          addNewUserToDb('STUDENTS', newUser.id, newUser);

          storeLocally('userUID', userUID);
          //serialize user obj due to local storage obj rules

          const response = await storeLocally('currentUserBasicInfo', newUser);

          if (response)
            console.log('successfully stored the user details ', response);
          setIsCreatingStudent(false);
          return setSeenUserUID(true);
        } catch (error) {
          commonFunctions.showToast(
            'FAILED CREATING YOUR ACCOUNT!',
            error.message,
            'ERROR',
          );
        }
      } catch (error) {
        commonFunctions.showToast(
          'Oops!!',
          `failed to create your account! try again later ${error.message}`,
          'error',
        );
      }
    } else if (currentNetworkStat == false) {
      commonFunctions.showToast(
        'sorry',
        `please check your mobile network ${currentNetworkStat}`,
        'error',
      );
    } else {
      commonFunctions.showToast(
        'sorry',
        `ooooooops ${currentNetworkStat}`,
        'error',
      );
    }
  };

  const {
    control,
    formState: {isValid},
    getValues,
    handleSubmit,
  } = useFormContext();

  const department = getValues('department');
  const level = getValues('level');

  if (creatingStudent) return <MediaSkeleton />;

  return (
    <View
      style={{
        flex: 1,
        padding: 50,
        justifyContent: 'center',
        backgroundColor: '#010101',
      }}>
      <AppSelectField
        placeholder="select your department"
        name="department"
        control={control}
        required={{required: 'your department'}}
        data={departments}
      />

      <AppSelectField
        placeholder="select your level"
        name="level"
        control={control}
        required={{required: 'your levels'}}
        data={levels}
      />

      <AppButton
        wideButton
        disabled={isValid || (department && level) ? false : true}
        onPress={handleSubmit(submitTheForm)}
        title={`finished`}
      />
      <Link text={'go back'} onPress={() => navigation.goBack(1)} />
    </View>
  );
};

export default FormSection4;
