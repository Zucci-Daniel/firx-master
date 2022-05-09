import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {universalPadding, colors} from '../config/config';

const AppIndicator = ({
  extraIndicatorStyle,
  forSubmiting = false,
  size = 50,
}) => {
  return (
    <ActivityIndicator
      color={colors.dimBlue}
      size={size}
      style={[
        forSubmiting ? styles.forSubmiting : styles.activity,
        extraIndicatorStyle,
      ]}
    />
  );
};

export default AppIndicator;

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: universalPadding,
    paddingVertical: universalPadding / 4,
  },
  forSubmiting: {
    alignSelf: 'flex-end',
    paddingHorizontal: universalPadding,
    paddingVertical: universalPadding,
  },
});
