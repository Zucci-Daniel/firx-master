import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, height, width} from '../../../../config/config';
import {Stack} from '../../../../navigation/create/CreateNavigation';
import {SelectedUserContextProvider} from './selectedUserContext';
import UserProfile from './UserProfile';
import UserAccommodation from './userAccommodation';

const UserProfileStack = ({navigation}) => {
  return (
    <SelectedUserContextProvider>
      <View style={styles.sceneContainerStyle}>
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
              headerStyle: {backgroundColor: colors.neonBg},
              headerShown: true,
              headerTitle: 'Profile',
              headerTintColor: colors.calmBlue,
            }}
          />
          <Stack.Screen
            name="userAccommodation"
            component={UserAccommodation}
            options={{
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </SelectedUserContextProvider>
  );
};

export default UserProfileStack;

const styles = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: colors.neonBg,
    height: height,
    width: width,
  },
});
