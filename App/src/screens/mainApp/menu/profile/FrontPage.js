import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {universalPadding, colors, width} from '../../../../config/config';
import {SignUpInfoContext} from './../../../forms/signUpInfoContext';
import ProfilePane from './../../../../components/ProfilePane';
import SocialHandles from '../../../../components/SocialHandles';

import {useNavigation} from '@react-navigation/native';

import InfoText from './../../../../components/InfoText';
import AnimatedImage from '../../../../components/AnimatedImage';

import MediaSkeleton from './../../../../components/MediaSkeleton';
import firestore from '@react-native-firebase/firestore';

import {MemoAppChip} from './../../../../components/AppChip';
import {AppContext} from './../../../../appContext';
import PlaceHolderParagraph from '../../../../components/PlaceHolderParagraph';
import Retry from './../../../../components/Retry';
import Link from './../../../../components/Link';
import SweetButton from './../../../../components/SweetButton';
import AppIndicator from '../../../../components/AppIndicator';

const FrontPage = () => {
  const navigation = useNavigation();
  const {user} = useContext(SignUpInfoContext);
  const {userUID} = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoadingPersonalities, setIsLoadingPersonalities] = useState(true);

  const [personalities, setPersonalities] = useState(
    user?.personalities ?? null,
  );

  const showImage = () => setShowModal(true);

  const hideModal = () => setShowModal(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    const subscribe = firestore()
      .collection('STUDENTS')
      .doc(userUID)
      .onSnapshot(documentSnapShot => {
        setPersonalities(documentSnapShot.data()?.personalities ?? null);
        setIsLoadingPersonalities(false);
      });

    return () => subscribe();
  }, []);

  if (isLoading) return <MediaSkeleton />;

  return (
    <>
      <View style={styles.mainContainer}>
        {!isLoading && (
          <View style={styles.container}>
            <AnimatedImage
              image={user?.profileImage}
              isVisible={showModal}
              onBackButtonPress={hideModal}
              onBackPress={hideModal}
            />
            <ProfilePane
              noPadding
              onPressOutImage={hideModal}
              onLongPressImage={showImage}
              extraUserNameStyle={styles.names}
              extraNameStyles={styles.school}
              readOnly
            />
            {user?.bio ? <InfoText info={user?.bio} /> : null}
            <SocialHandles />
          </View>
        )}

        {!isLoadingPersonalities && personalities == null && (
          <View
            style={{
              height: undefined,
              width: '100%',
              justifyContent: 'center',
              paddingVertical: 20,
            }}>
            <Retry
              notice="you probably haven't added any personality yet, or your mobile data is turned off"
              handleRetry={() => navigation.navigate('editPersonalities')}
            />
          </View>
        )}
        <SweetButton
          extraStyles={{
            backgroundColor: 'transparent',
            borderWidth: 5,
            borderColor: colors.calmBlue,
            width: '100%',
            marginVertical: 10,
          }}
          text={`Click or Swipe right to see activities`}
          onPress={() => navigation.navigate('profileMedia')}
        />
        <Link readOnly text={`personalities`} centered={false} />
        <View style={styles.scrollContainer}>
          {!isLoadingPersonalities && personalities?.length > 0 ? (
            personalities.map((item, index) => (
              <MemoAppChip
                readOnly
                bg={colors.skeletonAnimationBg}
                value={item}
                key={index}
                onPress={() => null}
              />
            ))
          ) : (
            <AppIndicator />
          )}
        </View>
      </View>
    </>
  );
};

export default FrontPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    backgroundColor: colors.neonBg,
    paddingHorizontal: 10,
  },
  container: {},
  edit: {
    margin: 0,
    marginVertical: universalPadding / 2,
    alignSelf: 'flex-start',
  },
  names: {
    color: colors.pureWhite,
  },
  school: {
    color: colors.initials,
  },

  mainContainer2: {
    height: undefined,
    width: width,
    paddingVertical: 40,
  },
  scrollContainer: {
    backgroundColor: 'transparent',
    height: undefined,
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  empty: {
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.info,
    fontWeight: '300',
  },
});
