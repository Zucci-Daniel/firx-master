import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

// import { Container } from './styles';

const SeparatedButtons = ({children, extraStyle}) => {
  return <Pressable style={[styles.bottom, extraStyle]}>{children}</Pressable>;
};

export default SeparatedButtons;

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
});
