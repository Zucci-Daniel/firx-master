import React from 'react';

import {React, TouchableOpacity} from 'react-native';
import Logo from '../../assets/svg-raw/logo.svg';

const AppLogo = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Logo width={40} height={40} />
    </TouchableOpacity>
  );
};

export default AppLogo;
