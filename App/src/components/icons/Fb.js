import React from 'react';

import {TouchableOpacity} from 'react-native';
import Facebook from '../../assets/svg-raw/fb.svg';
import {socialMediaSize} from '../../config/config';

const Fb = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Facebook width={socialMediaSize} height={socialMediaSize} />
    </TouchableOpacity>
  );
};

export default Fb;
