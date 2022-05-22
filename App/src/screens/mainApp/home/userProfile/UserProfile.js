import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import {
  height,
  colors,
  universalPadding,
  width,
  postSize,
  postHeight,
  tabBarLabelConfig,
  tabBarConfig,
  tabBarIndicatorConfig,
} from '../../../../config/config';

import MediaSkeleton from '../../../../components/MediaSkeleton';
import ProfilePane from './../../../../components/ProfilePane';

import SocialHandles from '../../../../components/SocialHandles';
import InfoText from './../../../../components/InfoText';
import SelectedUserPersonalities from './SelectedUserPersonalities';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AppIndicator from './../../../../components/AppIndicator';
import {SelectedUserContext} from './selectedUserContext';
import SelectedUserAuthoredPosts from './SelectedUserAuthoredPosts';
import AnimatedImage from './../../../../components/AnimatedImage';
import SweetButton from './../../../../components/SweetButton';
import SeparatedButtons from '../../../../components/SeparatedButtons';
import Retry from './../../../../components/Retry';

import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const Tab = createMaterialTopTabNavigator();

//Might have to be a stack later on
const UserProfile = ({navigation, route}) => {
  const [userToken, setUserToken] = useState(null);
  const {selectedUserDoc, isFetching, setId, getSelectedUser} =
    useContext(SelectedUserContext);

  const {posterUserUID} = route.params;

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(' zucci see ', posterUserUID);
    setId(posterUserUID);
  }, []);

  useEffect(() => {
    setSelectedUser({...selectedUserDoc});
  }, [selectedUserDoc]);

  const showImage = () => setShowModal(true);

  const hideModal = () => setShowModal(false);

  const handleGotoAcc = (id, image, name) => {
    console.log(id, ' got wthis');
    navigation.navigate('userAccommodation', {
      userID: id,
      image,
      name,
    });
  };

  const handleRetry = () => {
    console.log('retrying.....');
    getSelectedUser(posterUserUID);
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
    // first ask for permission, on ios important, for android, permission is always granted.
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      /*** Returns an FCM token for this device */
      await messaging()
        .getToken()
        .then(fcmToken => {
          console.log('FCM Token -> ', fcmToken);
          setUserToken(fcmToken);
        });
    } else console.log('Not Authorization status:', authStatus);
  };

  console.log('Hey dan! look at your token', userToken);

  if (isFetching) return <MediaSkeleton />;

  return (
    <View style={styles.mainContainer}>
      {!isFetching && selectedUserDoc == null && (
        <Retry
          notice="internet is unreachable, turn mobile data on and retry.."
          handleRetry={handleRetry}
        />
      )}
      {!isFetching && selectedUserDoc !== null && (
        <>
          <View style={styles.container}>
            <AnimatedImage
              image={selectedUser?.profileImage}
              isVisible={showModal}
              onBackButtonPress={hideModal}
              onBackPress={hideModal}
            />
            <ProfilePane
              noPadding
              onPressOutImage={hideModal}
              onLongPressImage={showImage}
              username={`${selectedUser?.firstName} ${selectedUser?.lastName}`}
              schoolInfo={`${selectedUser?.department} ${selectedUser?.level}`}
              externalProfileImage={selectedUser?.profileImage}
              dark={true}
              readOnly
            />
            <InfoText info={selectedUser?.bio} />
            <SocialHandles
              instagram={selectedUser?.instagram}
              twitter={selectedUser?.twitter}
              whatsapp={selectedUser?.whatsapp}
              facebook={selectedUser?.facebook}
              phone={selectedUser?.phone}
            />
            <SeparatedButtons>
              <SweetButton
                extraStyles={styles.accommodation}
                text="accommodation"
                onPress={() =>
                  handleGotoAcc(
                    posterUserUID,
                    selectedUser?.profileImage,
                    selectedUser?.firstName,
                  )
                }
              />
              <SweetButton
                extraStyles={styles.accommodation}
                text="send request"
                bg={colors.info}
                onPress={handleLocalNotification}
              />
              {/* <SweetButton
                extraStyles={styles.accommodation}
                text="send request"
                bg={colors.info}
                onPress={handleLocalNotification}
              />
              <SweetButton
                extraStyles={styles.accommodation}
                text="remote request"
                bg={colors.calmRed}
                onPress={handleRemoteNotification}
              /> */}
            </SeparatedButtons>
          </View>
          <Tab.Navigator
            sceneContainerStyle={styles.sceneContainerStyle}
            screenOptions={{
              tabBarLabelStyle: {...tabBarLabelConfig},
              tabBarStyle: {...tabBarConfig},
              tabBarIndicatorStyle: {...tabBarIndicatorConfig},
              tabBarShowLabel: true,
              tabBarShowIcon: true,
              swipeEnabled: false,
              lazy: true,
              tabBarInactiveTintColor: colors.fadeWhite,
              tabBarActiveTintColor: 'white',
              lazyPlaceholder: () => <AppIndicator />,
            }}>
            <Tab.Screen
              name="selectedUserAuthoredPosts"
              component={SelectedUserAuthoredPosts}
              options={{title: `${selectedUser?.firstName}'s posts`}}
            />
            <Tab.Screen
              name="selectedUserPersonalities"
              component={SelectedUserPersonalities}
              options={{title: 'personalities'}}
            />
          </Tab.Navigator>
        </>
      )}
    </View>
  );
};

export default UserProfile;

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
  sceneContainerStyle: {
    backgroundColor: colors.neonBg,
  },
  accommodation: {
    marginVertical: universalPadding / 4,
  },
});
