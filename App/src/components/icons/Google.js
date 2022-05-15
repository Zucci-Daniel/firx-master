import React from 'react';

import {TouchableOpacity} from 'react-native';

import GG from '../../assets/svg-raw/google.svg';

const Google = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <GG width={40} height={40} />
    </TouchableOpacity>
  );
};

export default Google;
