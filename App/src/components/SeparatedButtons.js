import React from 'react';
import {View, StyleSheet} from 'react-native';

// import { Container } from './styles';

const SeparatedButtons = ({children, extraStyle}) => {
  return <View style={[styles.bottom, extraStyle]}>{children}</View>;
};

export default SeparatedButtons;

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
});
