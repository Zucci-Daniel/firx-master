import React from 'react';
import { View ,StyleSheet} from 'react-native';
import { universalPadding } from '../config/config';

export default InputsGroup = ({extraStyles, children}) => {
  return <View style={[styles.group, extraStyles]}>{children}</View>;
};

const styles = StyleSheet.create({
  group: {
    paddingVertical: universalPadding, 
  },
});
