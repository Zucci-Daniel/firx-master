import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
  universalPadding,
  colors,
  width,
  tabBarLabelConfig,
  tabBarConfig,
  tabBarIndicatorConfig,
} from '../../../../config/config';
import {useContext} from 'react';
import {SignUpInfoContext} from './../../../forms/signUpInfoContext';
import ProfilePane from './../../../../components/ProfilePane';
import SocialHandles from '../../../../components/SocialHandles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Personalities from './Personalities';
import Link from './../../../../components/Link';
import {useNavigation} from '@react-navigation/native';
import AuthoredPosts from './../AuthoredPosts/AuthoredPosts';
import SavedPosts from './../SavedPosts/SavedPosts';
import AppIndicator from '../../../../components/AppIndicator';
import InfoText from './../../../../components/InfoText';

const Tab = createMaterialTopTabNavigator();

const FrontPage = () => {
  const navigation = useNavigation();
  const {user} = useContext(SignUpInfoContext);

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <ProfilePane
            profileImageSize={100}
            extraUserNameStyle={styles.names}
            extraNameStyles={styles.school}
            readOnly
          />
          <InfoText info={user?.bio} />
          <SocialHandles />
          <Link
            extraStyle={styles.edit}
            text="edit profile"
            onPress={() => navigation.navigate('editProfile')}
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
    paddingHorizontal: universalPadding / 2,
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
