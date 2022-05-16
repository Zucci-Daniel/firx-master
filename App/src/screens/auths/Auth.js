import React from 'react';

import {Stack} from '../../navigation/create/CreateNavigation';
import FormStack from './../forms/FormStack';
import Register from './Register';
import Confirmation from './Confirmation';

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="confirmation" component={Confirmation} />
      <Stack.Screen name="formStack" component={FormStack} />
    </Stack.Navigator>
  );
};

export default Auth;
