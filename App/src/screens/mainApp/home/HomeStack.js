import React from 'react';
import {Stack} from '../../../navigation/create/CreateNavigation';
import Home from './Home';
import CreatePost from './CreatePost';
import Photo from './Photo';
import Video from './Video';
import Write from './Write';
import Camera from './Camera';
import AppCancel from './../../../components/AppCancel';
import ViewPost from './userProfile/ViewPost';
import UserProfileStack from './userProfile/UserProfileStack';
import Link from '../../../components/Link';
import {colors} from '../../../config/config';

const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_left',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: `Vion`,
          animation: 'slide_from_right',
          headerShown: true,
          headerTintColor: colors.calmBlue,
          headerStyle: {backgroundColor: colors.neonBg},
          headerRight: () => (
            <Link text="post" onPress={() => navigation.navigate('camera')} />
          ),
        }}
      />
      <Stack.Screen
        name="viewPost"
        component={ViewPost}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="userProfileStack"
        component={UserProfileStack}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="write"
        component={Write}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
