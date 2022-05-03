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
import {getPost} from '../../../../hooks/useOperation';

import MediaSkeleton from '../../../../components/MediaSkeleton';
import ProfilePane from './../../../../components/ProfilePane';
import Twitter from './../../../../components/icons/Twitter';
import WhatsApp from './../../../../components/icons/WhatsApp';
import Ig from './../../../../components/icons/Ig';
import Fb from './../../../../components/icons/Fb';
import Phone from './../../../../components/icons/Phone';
import {useGetNewUser} from './../../../../hooks/useOperation';
import SocialHandles from '../../../../components/SocialHandles';
import InfoText from './../../../../components/InfoText';
import SelectedUserPersonalities from './SelectedUserPersonalities';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AppIndicator from './../../../../components/AppIndicator';
import {SelectedUserContext} from './selectedUserContext';
import SelectedUserAuthoredPosts from './SelectedUserAuthoredPosts';

const Tab = createMaterialTopTabNavigator();

//Might have to be a stack later on
const UserProfile = ({navigation, route}) => {
  const {
    selectedUserDoc,

    isFetching,

    setId,
  } = useContext(SelectedUserContext);

  const {posterUserUID} = route.params;

  const [selectedUser, setSelectedUser] = useState({});

  // const getSelectedUser = async posterUserUID => {
  //   //set the global state.
  //   console.log(posterUserUID, ' from the user Profile');
  //   setId(posterUserUID);

  //   const response = await useGetNewUser('STUDENTS', posterUserUID);

  //   if (response) {
  //     setSelectedUser({...response.data(), id: response.data().id});
  //     setIsLoading(false);
  //   }
  // };

  console.log(selectedUserDoc, ' ejeands', selectedUser);

  useEffect(() => {
    setId(posterUserUID);
  }, []);

  useEffect(() => {
    setSelectedUser({...selectedUserDoc});
  }, [selectedUserDoc]);

  if (isFetching) return <MediaSkeleton />;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <ProfilePane
          username={`${selectedUser.firstName} ${selectedUser.lastName}`}
          schoolInfo={`${selectedUser.department} ${selectedUser.level}`}
          externalProfileImage={selectedUser.profileImage}
          dark={true}
          readOnly
        />
        <InfoText info={selectedUser?.bio} />

        <SocialHandles
          instagram={selectedUser.instagram}
          twitter={selectedUser.twitter}
          whatsapp={selectedUser.whatsapp}
          facebook={selectedUser.facebook}
          phone={selectedUser.phone}
        />
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
          lazyPlaceholder: () => <AppIndicator />,
        }}>
        <Tab.Screen
          name="selectedUserAuthoredPosts"
          component={SelectedUserAuthoredPosts}
          options={{title: `${selectedUser.firstName}'s posts`}}
        />
        <Tab.Screen
          name="selectedUserPersonalities"
          component={SelectedUserPersonalities}
          options={{title: 'personalities'}}
        />
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
  },
  container: {
    height: undefined,
    width: width,
    paddingHorizontal: universalPadding / 2,
    paddingBottom: universalPadding / 5,
    backgroundColor: colors.neonBg,
  },
  sceneContainerStyle: {
    backgroundColor: colors.neonBg,
  },
});
