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
import AppInputField from '../../../../components/form-components/AppInputField';
import {useForm} from 'react-hook-form';
import AppSelectField from '../../../../components/form-components/AppSelectField';
import {departments, levels, schools} from '../../../../hooks/utils';
import AppRadioField from '../../../../components/form-components/AppRadioField';
import AppRadioOption from '../../../../components/AppRadioOption';
import AppImagePicker from '../../../../components/form-components/AppImagePicker';

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

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      gender,
      firstName,
      lastName,
      typeOfStudent,
      school,
      department,
      level,
      profileImage,
    },
    mode: 'all',
    shouldUnregister: false,
  });

  const handleUpdateProfile = async data => {
    try {
      if (data.profileImage !== profileImage) {
        let imageUri = await uploadFile(data.profileImage);
        updateDocument(userUID, 'STUDENTS', {...data, profileImage: imageUri});
        //show a slight toast message here.
      } else {
        updateDocument(userUID, 'STUDENTS', data);
      }

      setUser({...user, ...data});
    } catch (error) {
      console.log('failed to update ur profile', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.wrapper}>
          <AppImagePicker name="profileImage" control={control} />
        </View>
        <View style={styles.inputWrapper}>
          <AppInputField
            control={control}
            name="firstName"
            label={'first name'}
            required={{
              required: 'hey...your first name?',
              minLength: {value: 4, message: 'must be more than 4'},
            }}
          />
          <AppInputField
            control={control}
            name="lastName"
            label={'last name'}
            required={{
              required: 'hey...your last name?',
              minLength: {value: 4, message: 'must be more than 4'},
            }}
          />
          <AppSelectField
            placeholder="select your school"
            name="school"
            control={control}
            required={{required: 'your school'}}
            data={schools}
          />
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
          <AppRadioField
            name={'typeOfStudent'}
            required={{required: true}}
            control={control}>
            <AppRadioOption value={'Aspirant'} />
            <AppRadioOption value={'Admitted'} />
          </AppRadioField>
        </View>
      </ScrollView>
      <Link text="update" onPress={handleSubmit(handleUpdateProfile)} />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neonBg,
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
