import React from 'react';

import {TouchableOpacity} from 'react-native';

import Ph from '../../assets/svg-raw/phone.svg';
import {socialMediaSize} from '../../config/config';

const Phone = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ph width={socialMediaSize} height={socialMediaSize} />
    </TouchableOpacity>
  );
};

export default Phone;
