import React from 'react';
import { colors } from '../../../../config/config';
import {Stack} from '../../../../navigation/create/CreateNavigation';
import ButtonText from './../../../../components/ButtonText';
import FrontPage from './FrontPage';

const Profile = ({navigation}) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          presentation: 'modal',
          headerShadowVisible: false,
          headerShown: false,
        }}>
        <Stack.Screen
          name="frontPage"
          component={FrontPage}
          options={{
            headerTitle: '',
            headerStyle: {backgroundColor: colors.neonBg},
            headerShown: true,
            headerTitle:'Your Profile',
            headerTintColor:colors.calmBlue
            // headerRight: () => (
            //   <Link
            //     text="edit profile"
            //     onPress={() => navigation.navigate('editProfile')}
            //   />
            // ),
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Profile;
