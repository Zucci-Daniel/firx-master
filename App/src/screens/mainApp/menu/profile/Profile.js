import React from 'react';
import {Stack} from '../../../../navigation/create/CreateNavigation';
import ButtonText from './../../../../components/ButtonText';
import FrontPage from './FrontPage';

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
            <ButtonText
              bg="cadetblue"
              title="edit profile"
              onPress={() => navigation.navigate('editProfile')}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Profile;
