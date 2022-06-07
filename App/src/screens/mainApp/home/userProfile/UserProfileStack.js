import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, height, width } from '../../../../config/config';
import { Stack } from '../../../../navigation/create/CreateNavigation';
import UserProfile from './UserProfile';
import UserAccommodation from './userAccommodation';
import { SelectedUserContext } from './selectedUserContext';

const UserProfileStack = ({ navigation }) => {
  const { selectedUserDoc, isFetching } = useContext(SelectedUserContext);
  return (
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
            headerStyle: { backgroundColor: colors.neonBg },
            headerShown: true,
            headerTitle:
              !isFetching && selectedUserDoc
                ? `${selectedUserDoc?.firstName ?? 'Anonymous'}'s Profile`
                : '...', //should be user name.
            headerTintColor: colors.calmBlue,
          }}
        />
      </Stack.Navigator>
    </View>
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
