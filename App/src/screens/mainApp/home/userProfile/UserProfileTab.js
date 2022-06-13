import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectedUserContext } from './selectedUserContext';
import AnimatedImage from './../../../../components/AnimatedImage';
import ProfilePane from './../../../../components/ProfilePane';
import SweetButton from './../../../../components/SweetButton';
import SocialHandles from './../../../../components/SocialHandles';
import InfoText from './../../../../components/InfoText';
import { colors, universalPadding, width } from '../../../../config/config';
import SeparatedButtons from '../../../../components/SeparatedButtons';
import MediaSkeleton from './../../../../components/MediaSkeleton';
import { MemoAppChip } from './../../../../components/AppChip';
import Link from './../../../../components/Link';
import PlaceHolderParagraph from './../../../../components/PlaceHolderParagraph';

import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import AppIndicator from '../../../../components/AppIndicator';
import { AppContext } from '../../../../appContext';
import { SignUpInfoContext } from '../../../forms/signUpInfoContext';
import { updateDocument } from '../../../../hooks/useOperation';
import firestore from '@react-native-firebase/firestore';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background! 2', remoteMessage);
});

const UserMainProfile = ({ navigation, route }) => {
  const { selectedUserDoc, isFetching } = useContext(SelectedUserContext);
  const { user } = useContext(SignUpInfoContext);
  const { userUID } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const showImage = () => setShowModal(true);

  const hideModal = () => setShowModal(false);

  const handleGotoAcc = () => {
    navigation.navigate('userMedia', { screen: 'userAccommodation' });
  };

  const handleLocalNotification = async () => {
    console.log('sending local notice');
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Hey Zucci',
      body: 'Good job so far',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      },
    });
  };

  const handleRemoteNotification = async () => {

    const payload = {
      requesterName: user?.firstName,
      requesterId: userUID,
      requesterPic: user?.profileImage
    }
    try {

      const response = await firestore().collection('STUDENTS').doc(selectedUserDoc?.id).collection('requests').add(payload);

      if (response) {
        console.log(response, ' ressy')
      }

    } catch (error) {
      console.log(error, ' and ,am')
    }
    console.log(payload, selectedUserDoc?.id)

  };

  const testSend = async fcmToken => {
    try {
      await messaging().sendMessage({
        to: fcmToken,
        data: { title: 'hi boo', body: 'tesingggg' },
        contentAvailable: true,
        notification: {
          title: 'zucci sent something',
          body: 'thats true',
          android: { priority: 'high' },
        },
      });
    } catch (error) {
      console.log(error.message, ' testing');
    }
  };

  const sendNotice = async deviceId => {
    console.log(deviceId, ' device ids');
    const key = 'AIzaSyC1b-KxZjmGBr9tHq6xaVZ2uanTTTMbNdM';

    try {
      const message = {
        to: deviceId,
        notification: {
          title: 'Zucci my boy',
          body: 'programming just got easier',
          vibrate: 1,
          sound: 1,
          show_in_foreground: true,
          priority: 'high',
          content_available: true,
        },
      };

      let headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: 'key=' + key,
      });

      let response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers,
        body: JSON.stringify(message),
      });
      // response = await response.json();
      console.log(response, ' wala!!');
    } catch (error) {
      console.log('failed bro ', error, error.message);
    }
  };

  if (isFetching) return <MediaSkeleton />;

  if (selectedUserDoc?.firstName == undefined) {
    return (
      <View style={{ padding: 20 }}>
        <Link
          extraStyle={{ textTransform: 'lowercase', textAlign: 'center' }}
          text={`if you're sure your network is stable, then it looks like this user doesn't exist, they probably must have left this platform... you can only see what they post and maybe thier names, but can't see their profile due to some restrictions.
        `}
        />
        <SweetButton
          text={`View previous activities`}
          onPress={() => navigation.navigate('userMedia')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selectedUserDoc?.firstName !== undefined && (
        <>
          <AnimatedImage
            image={selectedUserDoc?.profileImage}
            isVisible={showModal}
            onBackButtonPress={hideModal}
            onBackPress={hideModal}
          />
          {selectedUserDoc?.firstName ? (
            <ProfilePane
              noPadding
              onPressOutImage={hideModal}
              onLongPressImage={showImage}
              username={`${selectedUserDoc?.firstName} ${selectedUserDoc?.lastName}`}
              schoolInfo={`${selectedUserDoc?.department} ${selectedUserDoc?.level}`}
              externalProfileImage={selectedUserDoc?.profileImage}
              dark={true}
              readOnly
            />
          ) : (
            <AppIndicator />
          )}
          <InfoText info={selectedUserDoc?.bio} />
          <SocialHandles
            instagram={selectedUserDoc?.instagram}
            twitter={selectedUserDoc?.twitter}
            whatsapp={selectedUserDoc?.whatsapp}
            facebook={selectedUserDoc?.facebook}
            phone={selectedUserDoc?.phone}
          />

          <SeparatedButtons>
            <SweetButton
              extraStyles={styles.accommodation}
              text="accommodation"
              onPress={() => handleGotoAcc()}
            />
            <SweetButton
              extraStyles={styles.accommodation}
              text="send request"
              bg={colors.info}
              onPress={() => handleRemoteNotification()}
            />
          </SeparatedButtons>
          <SweetButton
            extraStyles={{
              backgroundColor: 'transparent',
              borderWidth: 5,
              borderColor: colors.calmBlue,
              width: '100%',
              marginVertical: 10,
            }}
            text={`Click or Swipe right to see activities`}
            onPress={() => navigation.navigate('userMedia')}
          />
          <View style={styles.mainContainer}>
            <Link readOnly text={`personalities`} centered={false} />

            <View style={styles.scrollContainer}>
              {!isFetching && selectedUserDoc?.personalities?.length > 0
                ? selectedUserDoc?.personalities.map((item, index) => (
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
        </>
      )}
    </View>
  );
};

export default UserMainProfile;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    backgroundColor: colors.neonBg,
    justifyContent: 'center',
  },
  container: {
    height: undefined,
    width: width,
    paddingHorizontal: universalPadding / 3,
    paddingBottom: universalPadding / 5,

    backgroundColor: colors.neonBg,
  },

  accommodation: {
    marginVertical: universalPadding / 4,
  },
  mainContainer: {
    height: undefined,
    width: width,
    paddingBottom: 300,
  },
  scrollContainer: {
    backgroundColor: 'transparent',
    height: undefined,
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 30,
  },
});
