import React from 'react';

import {TouchableOpacity} from 'react-native';
import Tweet from '../../assets/svg-raw/twitter.svg';
import {socialMediaSize} from '../../config/config';

const Twitter = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Tweet width={socialMediaSize} height={socialMediaSize} />
    </TouchableOpacity>
  );
};

export default Twitter;
