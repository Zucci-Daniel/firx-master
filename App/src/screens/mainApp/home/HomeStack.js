import React from 'react';
import {Stack} from '../../../navigation/create/CreateNavigation';
import Home from './Home';
import Write from './Write';
import ViewPost from './userProfile/ViewPost';
import {colors} from '../../../config/config';
import SweetButton from './../../../components/SweetButton';
import SelectedUserStack from './SelectedUserStack';
import {View} from 'react-native';

const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_left',
        headerShadowVisible: false,
        headerTintColor: colors.calmBlue,
        headerStyle: {backgroundColor: colors.neonBg},
      }}>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: `|||-|||-|||-|||`,
          animation: 'slide_from_right',
          headerShown: true,

          headerRight: () => (
            <SweetButton
              text="create a post"
              onPress={() => navigation.navigate('camera')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="viewPost"
        component={ViewPost}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Post Details',
        }}
      />
      <Stack.Screen
        name="userProfileStack"
        component={SelectedUserStack}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
