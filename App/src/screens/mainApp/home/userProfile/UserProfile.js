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
import Link from '../../../../components/Link';
import Retry from './../../../../components/Retry';

const Tab = createMaterialTopTabNavigator();

//Might have to be a stack later on
const UserProfile = ({navigation, route}) => {
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
                onPress={() =>
                  handleGotoAcc(
                    posterUserUID,
                    selectedUser?.profileImage,
                    selectedUser?.firstName,
                  )
                }
              />
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
