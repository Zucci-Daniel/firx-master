import React from 'react';
import {View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {width} from '../config/config';

const ControlIcon = ({
  iconName = 'play',
  size = 30,
  color = 'white',
  extraPlayStyles,
  onPress,
}) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      style={[styles.shadow, extraPlayStyles]}>
      <Ionicons
        name={iconName}
        size={size}
        color={color}
        style={[styles.icon, extraPlayStyles]}
      />
    </TouchableNativeFeedback>
  );
};

export default ControlIcon;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },
});
