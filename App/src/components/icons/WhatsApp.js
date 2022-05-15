import React from 'react';

import {TouchableOpacity} from 'react-native';

import Wa from '../../assets/svg-raw/whatsapp.svg';
import {socialMediaSize} from '../../config/config';

const WhatsApp = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Wa width={socialMediaSize} height={socialMediaSize} />
    </TouchableOpacity>
  );
};

export default WhatsApp;
