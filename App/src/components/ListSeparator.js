import React from 'react';
import {View} from 'react-native';
import { colors, width } from '../config/config';

const ListSeparator = () => {
  return (
    <View
      style={{
        height: 50,
        width: width,
        backgroundColor: colors.neonBg,
        backgroundColor:'red',
      }}
    />
  );
};

export default ListSeparator;
