import React, {useContext} from 'react';

import {StyleSheet, View, Text} from 'react-native';
import {Stack} from '../../../navigation/create/CreateNavigation';
import AuthoredPosts from './AuthoredPosts/AuthoredPosts';
import {useNavigation} from '@react-navigation/native';
import SavedPosts from './SavedPosts/SavedPosts';
import Link from './../../../components/Link';
import {height, width, colors, brandFont} from '../../../config/config';
import Profile from './profile/Profile';
import MenuList from './MenuList';
import {SignUpInfoContext} from './../../forms/signUpInfoContext';
import AppHeader from './../../../components/AppHeader';

const Menu = () => {
  const {user} = useContext(SignUpInfoContext);

  const navigation = useNavigation();
  //this "might" be a stack navigation, so be prepared!
  return (
    <View style={styles.sceneContainerStyle}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTintColor: colors.fadeWhite,
          headerStyle: {backgroundColor: colors.neonBg},
          headerShadowVisible: false,
          animation: 'slide_from_right',
          headerTitleStyle: {
            fontFamily: brandFont.medium,
            left: 0,
          },
          headerLeft: () => (
            <AppHeader
              title={` ${user?.firstName} ${user?.lastName}`}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <Link
              text="Edit Profile"
              onPress={() => navigation.navigate('editProfile')}
            />
          ),
        }}>
        <Stack.Screen name="menuList" component={MenuList} />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{
            headerShown: true,
            title: '',
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: colors.neonBg,
    height: height,
    width: width,
  },
});
