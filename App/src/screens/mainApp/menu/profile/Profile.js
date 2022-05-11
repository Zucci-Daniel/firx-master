import React, {useContext} from 'react';
import {colors} from '../../../../config/config';
import {Stack} from '../../../../navigation/create/CreateNavigation';
import ButtonText from './../../../../components/ButtonText';
import FrontPage from './FrontPage';
import {SignUpInfoContext} from './../../../forms/signUpInfoContext';
import Link from './../../../../components/Link';

const Profile = ({navigation}) => {
  const {user} = useContext(SignUpInfoContext);

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
            headerTitle: user?.firstName,
            headerTintColor: colors.calmBlue,
            headerRight: () => (
              <Link
                text="edit profile"
                onPress={() => navigation.navigate('editProfile')}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Profile;
