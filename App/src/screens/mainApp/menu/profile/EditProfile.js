import {
  React,
  StyleSheet,
  View,
  ScrollView,
} from '../../../../imports/all_RnComponents';
import {AppButton, config, AppTextArea} from '../../../../imports/all_files';
import {SignUpInfoContext} from '../../../forms/signUpInfoContext';
import {useContext, useState, useEffect} from 'react';
import Link from './../../../../components/Link';
import {
  updateAllPostsFields,
  updateDocument,
} from '../../../../hooks/useOperation';
import {useUploadFile} from './../../../../hooks/useUploadFile';
import {AppContext} from './../../../../appContext';
import AppInputField from '../../../../components/form-components/AppInputField';
import {useForm} from 'react-hook-form';
import AppSelectField from '../../../../components/form-components/AppSelectField';
import {departments, levels, schools} from '../../../../hooks/utils';
import AppRadioField from '../../../../components/form-components/AppRadioField';
import AppRadioOption from '../../../../components/AppRadioOption';
import AppImage from './../../../../components/AppImage';

const {universalPadding, colors, avatarEditWidth} = config;

const EditProfile = ({navigation}) => {
  const uploadFile = useUploadFile();

  const {userUID} = useContext(AppContext);

  const {user, setUser} = useContext(SignUpInfoContext);

  const {
    department,
    firstName,
    gender,
    lastName,
    level,
    profileImage,
    school,
    typeOfStudent,
    bio,
  } = user;

  const [everthingIsTheSame, setEverthingIsTheSame] = useState(true);
  const [imageChanged, setImageChanged] = useState(false);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);

  const {
    control,
    handleSubmit,
    watch,
    formState: {isValid},
  } = useForm({
    defaultValues: {
      gender,
      firstName,
      lastName,
      typeOfStudent,
      school,
      department,
      level,
      bio,
    },
    mode: 'all',
    shouldUnregister: false,
  });

  const handleUpdateProfile = async data => {
    //no need for extra works, firebase won't update the fields if the old value and the new values are still the same, the issue u need to look here later is the fact that, what you are sending via data is much, even if the details are still the same, look for a way to know the particular field the user changed, and only send those. GOOD JOBS SO FAR!!, i'm proud of you.
    //check if he changed the image state
    if (imageChanged) {
      let imageUri = await uploadFile(currentProfileImage);
      updateDocument(userUID, 'STUDENTS', {
        ...data,
        profileImage: imageUri,
      });
      updateAllPostsFields(userUID, 'AllPosts', {
        posterAvatar: imageUri,
        posterName: `${data.firstName} ${data.lastName}`,
      });
    } else {
      updateDocument(userUID, 'STUDENTS', {
        ...data,
      });
      updateAllPostsFields(userUID, 'AllPosts', {
        posterName: `${data.firstName} ${data.lastName}`,
      });
    }
    setUser({...user, ...data});
  };

  const handleProfileImageSelection = image => {
    setImageChanged(image == false ? false : true);
    image !== false && setCurrentProfileImage(image);
  };

  const watchForm = watch();

  useEffect(() => {
    const {
      gender: oldGender,
      firstName: oldFirstName,
      lastName: oldLastName,
      typeOfStudent: oldTypeOfStudent,
      school: oldSchool,
      department: oldDepartment,
      level: oldLevel,
    } = watchForm;

    if (
      oldGender == gender &&
      oldFirstName == firstName &&
      oldLastName == lastName &&
      oldTypeOfStudent == typeOfStudent &&
      oldSchool == school &&
      oldDepartment == department &&
      oldLevel == level &&
      imageChanged == false
    ) {
      setEverthingIsTheSame(true);
    } else {
      setEverthingIsTheSame(false);
    }
  }, [watchForm]);

  return (
    <View style={styles.container}>
      {!everthingIsTheSame && isValid && (
        <Link
          text="update"
          extraStyle={styles.update}
          onPress={handleSubmit(handleUpdateProfile)}
        />
      )}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.wrapper}>
          <AppImage
            size={avatarEditWidth}
            theImage={image => handleProfileImageSelection(image)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <AppInputField
            background={colors.info}
            control={control}
            name="firstName"
            label={'first name'}
            required={{
              required: 'hey...your first name?',
              minLength: {value: 4, message: 'must be more than 4'},
            }}
          />
          <AppInputField
            background={colors.info}
            control={control}
            name="lastName"
            label={'last name'}
            required={{
              required: 'hey...your last name?',
              minLength: {value: 4, message: 'must be more than 4'},
            }}
          />
          <AppInputField
            background={colors.info}
            control={control}
            name="bio"
            label={'About yourself...'}
            required={{
              required: false,
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
  update: {
    alignSelf: 'flex-end',
    color: colors.fadeWhite,
    fontWeight: 'bold',
  },
});
