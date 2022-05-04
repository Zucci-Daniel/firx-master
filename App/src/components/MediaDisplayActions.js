import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, width} from '../config/config';
import AppIconButton from './AppIconButton';

const MediaDisplayActions = ({openGallery, openCamera, openVideo,extraStyles}) => {
  return (
    <View style={[styles.actions,extraStyles]}>
      <AppIconButton onPress={openGallery} iconName="images" />
      <AppIconButton onPress={openCamera} iconName="camera-outline" />
      <AppIconButton onPress={openVideo} iconName="videocam-outline" />
    </View>
  );
};

export default MediaDisplayActions;
const styles = StyleSheet.create({
  actions: {
    width: width,
    height: undefined,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
