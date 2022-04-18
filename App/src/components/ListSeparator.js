import React from 'react';
import {View} from 'react-native';
import { colors } from '../config/config';

const ListSeparator = () => {
  return (
    <View
      style={{
        height: 20,
        width: '100%',
        backgroundColor: colors.neonBg,
        backgroundColor:'red',
      }}
    />
  );
};

export default ListSeparator;
