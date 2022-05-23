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
import UserMedia from './UserMedia';
import UserMainProfile from './UserProfileTab';

const Tab = createMaterialTopTabNavigator();

//Might have to be a stack later on
const UserProfile = ({navigation, route}) => {
  const [userToken, setUserToken] = useState(null);
  const {selectedUserDoc, isFetching, setId, getSelectedUser} =
    useContext(SelectedUserContext);

  const {posterUserUID} = route.params;

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    console.log(' zucci see ', posterUserUID);
    setId(posterUserUID);
  }, []);

  useEffect(() => {
    setSelectedUser({...selectedUserDoc});
  }, [selectedUserDoc]);

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


  if (isFetching) return <MediaSkeleton />;

  return (
    <View style={styles.mainContainer}>
      <Tab.Navigator
        sceneContainerStyle={styles.sceneContainerStyle}
        screenOptions={{
          lazy: true,
          lazyPlaceholder: () => <AppIndicator />,
          tabBarShowLabel: false,
          tabBarStyle: {display: 'none'},
        }}>
        <Tab.Screen
          name="userMainProfile"
          component={UserMainProfile}
          options={{title: ''}}
        />
        <Tab.Screen name="userMedia" component={UserMedia} />
      </Tab.Navigator>
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
