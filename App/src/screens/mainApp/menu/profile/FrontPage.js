import React, {useState, useContext} from 'react';
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

const Tab = createMaterialTopTabNavigator();

const FrontPage = () => {
  const navigation = useNavigation();
  const {user} = useContext(SignUpInfoContext);

  const [showModal, setShowModal] = useState(false);

  const showImage = () => setShowModal(true);

  const hideModal = () => setShowModal(false);

  return (
    <>
      <View style={styles.mainContainer}>
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
        <Tab.Navigator
          sceneContainerStyle={styles.sceneContainerStyle}
          screenOptions={{
            tabBarLabelStyle: {...tabBarLabelConfig, color: colors.calmBlue},
            tabBarStyle: {...tabBarConfig},
            tabBarIndicatorStyle: {...tabBarIndicatorConfig},
            tabBarShowLabel: true,
            tabBarShowIcon: true,
            swipeEnabled: false,
            lazy: true,
            lazyPlaceholder: () => <AppIndicator />,
          }}>
          <Tab.Screen
            name="recentPosts"
            component={AuthoredPosts}
            options={{title: 'recent posts'}}
          />
          <Tab.Screen name="saved" component={SavedPosts} />
          <Tab.Screen
            name="personalities"
            component={Personalities}
            options={{title: 'personalities', lazy: true}}
          />
        </Tab.Navigator>
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
  sceneContainerStyle: {
    backgroundColor: colors.neonBg,
  },
});
