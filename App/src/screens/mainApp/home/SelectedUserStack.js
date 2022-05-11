import React from 'react';
import {View} from 'react-native';
import {SelectedUserContextProvider} from './userProfile/selectedUserContext';
import UserProfileStack from './userProfile/UserProfileStack';

const SelectedUserStack = () => {
  return (
    <SelectedUserContextProvider>
      <UserProfileStack />
    </SelectedUserContextProvider>
  );
};

export default SelectedUserStack;
