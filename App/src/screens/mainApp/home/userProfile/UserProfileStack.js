import React from 'react';
import {Stack} from '../../../../navigation/create/CreateNavigation';
import UserProfile from './UserProfile';

const UserProfileStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_left',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="userProfile"
        component={UserProfile}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
        name="write"
        component={Write}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default UserProfileStack;
