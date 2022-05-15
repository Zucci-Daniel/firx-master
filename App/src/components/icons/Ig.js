import React from 'react';

import {TouchableOpacity} from 'react-native';
import Instagram from '../../assets/svg-raw/ig.svg';
import {socialMediaSize} from '../../config/config';

const Ig = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Instagram width={socialMediaSize} height={socialMediaSize} />
    </TouchableOpacity>
  );
};

export default Ig;
