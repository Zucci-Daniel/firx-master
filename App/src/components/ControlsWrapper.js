import React from 'react';
import {View, StyleSheet} from 'react-native';
import { postHeight } from '../config/config';

const ControlsWrapper = ({children,extraStyles}) => {
  return <View style={[styles.container,extraStyles]}>{children}</View>;
};

export default ControlsWrapper;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height:postHeight/4,
    backgroundColor: 'transparent',
   
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center'
  },
});
