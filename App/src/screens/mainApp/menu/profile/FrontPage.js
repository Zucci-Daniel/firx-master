import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  universalPadding,
  colors,
  width,
  tabBarLabelConfig,
  tabBarConfig,
  tabBarIndicatorConfig,
} from '../../../../config/config';
import {SignUpInfoContext} from './../../../forms/signUpInfoContext';
import ProfilePane from './../../../../components/ProfilePane';
import SocialHandles from '../../../../components/SocialHandles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Personalities from './Personalities';
import {useNavigation} from '@react-navigation/native';
import AuthoredPosts from './../AuthoredPosts/AuthoredPosts';
import SavedPosts from './../SavedPosts/SavedPosts';
import AppIndicator from '../../../../components/AppIndicator';
import InfoText from './../../../../components/InfoText';
import AnimatedImage from '../../../../components/AnimatedImage';
import SweetButton from './../../../../components/SweetButton';
import SeparatedButtons from './../../../../components/SeparatedButtons';
import MediaSkeleton from './../../../../components/MediaSkeleton';
import firestore from '@react-native-firebase/firestore';
import AppScrollView from './../../../../components/AppScrollView';
import {MemoAppChip} from './../../../../components/AppChip';
import {AppContext} from './../../../../appContext';
import PlaceHolderParagraph from '../../../../components/PlaceHolderParagraph';

const Tab = createMaterialTopTabNavigator();

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
          <View style={{height: '100%', justifyContent: 'center'}}>
            <Retry
              notice="you haven't added any personality yet, or your mobile data is turned off"
              handleRetry={() => navigation.navigate('editPersonalities')}
            />
          </View>
        )}

        <View style={styles.mainContainer2}>
          <View style={styles.scrollContainer}>
            {!isLoadingPersonalities && personalities?.length > 0
              ? personalities.map((item, index) => (
                  <MemoAppChip
                    readOnly
                    bg={colors.skeletonAnimationBg}
                    value={item}
                    key={index}
                    onPress={() => null}
                  />
                ))
              : null}
          </View>
        </View>

        <PlaceHolderParagraph
          onPress={() => navigation.navigate('profileMedia')}
          text={'Swipe right to see your medias'}
          extraStyles={{
            textAlign: 'center',
            color: colors.calmBlue,
            marginVertical: 10,
          }}
        />
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
    paddingVertical: 0,
  },
  container: {
    height: undefined,
    width: width,
    paddingHorizontal: universalPadding / 3,
    paddingBottom: universalPadding / 5,
    backgroundColor: colors.neonBg,
  },
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
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    backgroundColor: 'transparent',
    height: undefined,
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  empty: {
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.info,
    fontWeight: '300',
  },
});
