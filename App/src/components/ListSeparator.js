import React from 'react';
import {View} from 'react-native';
import { colors } from '../config/config';

const ListSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: colors.pureWhite,
      }}
    />
  );
};

export default ListSeparator;
