import React from 'react';
import {Stack} from '../../../../navigation/create/CreateNavigation';
import ButtonText from './../../../../components/ButtonText';
import FrontPage from './FrontPage';
import Link from './../../../../components/Link';

const Profile = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        presentation: 'modal',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="frontPage"
        component={FrontPage}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#010101'},
          headerRight: () => (
            <Link
              text="edit profile"
              onPress={() => navigation.navigate('editProfile')}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Profile;
