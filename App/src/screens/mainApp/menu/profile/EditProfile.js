import React from 'react';
import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import {config, Ig} from '../../../../imports/all_files';
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
import {HomeContext} from '../../home/homeContext';
import SMHandle from './../../../../components/SMHandle';
import WhatsApp from '../../../../components/icons/WhatsApp';
import Fb from './../../../../components/icons/Fb';
import Twitter from './../../../../components/icons/Twitter';
import {postHeight} from '../../../../config/config';
import AppIndicator from './../../../../components/AppIndicator';

const {universalPadding, colors, avatarEditWidth, width, height} = config;

const EditProfile = ({navigation}) => {
  const {posted, setPosted} = useContext(HomeContext);

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
    instagram,
    facebook,
    whatsapp,
    twitter,
  } = user;
  const [everthingIsTheSame, setEverthingIsTheSame] = useState(true);
  const [imageChanged, setImageChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(null);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [showSocialMedia, setShowSocialMedia] = useState(false);
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
      bio: bio ? bio : 'enter bio...',
      instagram: instagram ? instagram : 'instagram',
      facebook: facebook ? facebook : 'facebook',
      whatsapp: whatsapp ? whatsapp : 'whatsapp',
      twitter: twitter ? twitter : 'twitter',
    },
    mode: 'all',
    shouldUnregister: false,
  });

  const updateLocalState = validData => {
    setImageChanged(false);
    setPosted(posted + 1);
    setUser({...user, ...validData});

    setIsUpdating(false);
  };

  const updateMe = async (shouldAppendImageField, data, imageUri) => {
    console.log(shouldAppendImageField, data, imageUri, ' xxxx');
    if (shouldAppendImageField) {
      const updateDocumentResponse = await updateDocument(userUID, 'STUDENTS', {
        ...data,
        profileImage: imageUri,
      });
      if (updateDocumentResponse) {
        const updateAllPostsFieldsResponse = await updateAllPostsFields(
          userUID,
          'AllPosts',
          {
            posterAvatar: imageUri,
            posterName: `${data.firstName} ${data.lastName}`,
          },
        );

        if (updateAllPostsFieldsResponse) return updateLocalState(data);
        if (!updateAllPostsFieldsResponse) return setIsUpdating(false);
      } else {
        console.log('failed to update oo');
        setIsUpdating(false);
      }
    } else {
      const updateDocumentResponse = await updateDocument(userUID, 'STUDENTS', {
        ...data,
      });

      if (updateDocumentResponse) {
        const updateAllPostsFieldsResponse = await updateAllPostsFields(
          userUID,
          'AllPosts',
          {
            posterName: `${data.firstName} ${data.lastName}`,
          },
        );

        if (updateAllPostsFieldsResponse) updateLocalState(data);
        if (!updateAllPostsFieldsResponse) setIsUpdating(false);
      } else {
        console.log(data);
        console.log('failed to update oo00');
        setIsUpdating(false);
      }
    }
  };

  const handleUpdateProfile = async data => {
    setIsUpdating(true);
    //no need for extra works, firebase won't update the fields if the old value and the new values are still the same, the issue u need to look here later is the fact that, what you are sending via data is much, even if the details are still the same, look for a way to know the particular field the user changed, and only send those. GOOD JOBS SO FAR!!, i'm proud of you.
    //check if he changed the image state
    try {
      if (imageChanged) {
        let imageUri = await uploadFile(currentProfileImage);
        if (imageUri) {
          console.log(imageUri, ' image rui');
          updateMe(true, data, imageUri);
        }
      } else updateMe(false, data);
    } catch (error) {
      console.log(data, ' faie');
      console.log('failed to update man, ', error.message);
      setIsUpdating(false);
    }
    console.log(data);
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
      bio: oldBio,
      instagram: oldInstagram,
      facebook: oldFacebook,
      whatsapp: oldWhatsapp,
      twitter: oldTwitter,
    } = watchForm;

    if (
      oldGender == gender &&
      oldFirstName == firstName &&
      oldLastName == lastName &&
      oldTypeOfStudent == typeOfStudent &&
      oldSchool == school &&
      oldDepartment == department &&
      oldLevel == level &&
      oldBio == bio &&
      oldInstagram == instagram &&
      oldFacebook == facebook &&
      oldWhatsapp == whatsapp &&
      oldTwitter == twitter &&
      imageChanged == false
    ) {
      setEverthingIsTheSame(true);
    } else {
      setEverthingIsTheSame(false);
    }
  }, [watchForm]);

  return (
    <View style={styles.container}>
      {!everthingIsTheSame && isValid && !isUpdating ? (
        <Link
          text="update"
          extraStyle={styles.update}
          onPress={handleSubmit(handleUpdateProfile)}
        />
      ) : isUpdating ? (
        <AppIndicator forSubmiting extraIndicatorStyle={styles.extraIndicatorStyle} />
      ) : null}

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.wrapper}>
          <AppImage
            size={avatarEditWidth}
            theImage={image => handleProfileImageSelection(image)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <AppInputField
            background={colors.skeletonAnimationBg}
            control={control}
            name="firstName"
            label={'first name'}
            required={{
              required: 'hey...your first name?',
              minLength: {value: 4, message: 'must be more than 4'},
            }}
          />
          <AppInputField
            background={colors.skeletonAnimationBg}
            control={control}
            name="lastName"
            label={'last name'}
            required={{
              required: 'hey...your last name?',
              minLength: {value: 4, message: 'must be more than 4'},
            }}
          />
          <AppInputField
            background={colors.skeletonAnimationBg}
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

          <Link
            text={'social media handles'}
            onPress={() => setShowSocialMedia(!showSocialMedia)}
          />

          {showSocialMedia && (
            <View style={styles.socials}>
              <SMHandle>
                <Ig />
                <AppInputField
                  extraStyle={styles.extraPasteLinkInput}
                  background={colors.skeletonAnimationBg}
                  control={control}
                  name="instagram"
                  label={'Instagram profile link...'}
                />
              </SMHandle>
              <SMHandle>
                <Fb />
                <AppInputField
                  extraStyle={styles.extraPasteLinkInput}
                  background={colors.skeletonAnimationBg}
                  control={control}
                  name="facebook"
                  label={'facebook profile link...'}
                />
              </SMHandle>
              <SMHandle>
                <WhatsApp />
                <AppInputField
                  extraStyle={styles.extraPasteLinkInput}
                  background={colors.skeletonAnimationBg}
                  control={control}
                  name="whatsapp"
                  label={'whatsapp number...'}
                />
              </SMHandle>
              <SMHandle>
                <Twitter />
                <AppInputField
                  extraStyle={styles.extraPasteLinkInput}
                  background={colors.skeletonAnimationBg}
                  control={control}
                  name="twitter"
                  label={'twitter profile link...'}
                />
              </SMHandle>
            </View>
          )}
          <Link
            text={'edit personalities'}
            onPress={() => navigation.navigate('editPersonalities')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    height: undefined,
    width: width,
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
    paddingBottom: postHeight,
  },
  update: {
    alignSelf: 'flex-end',
    color: colors.fadeWhite,
    fontWeight: 'bold',
  },
  extraPasteLinkInput: {
    width: '80%',
  },

  socials: {
    height: undefined,
    width: '100%',
  },
});
