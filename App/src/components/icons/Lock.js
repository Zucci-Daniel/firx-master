import React from 'react';

import {TouchableOpacity} from 'react-native';

import Locked from '../../assets/svg-raw/lock.svg';

const Lock = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Locked width={50} height={50} />
    </TouchableOpacity>
  );
};

export default Lock;
