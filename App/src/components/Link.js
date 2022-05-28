import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, universalPadding} from '../config/config';

export default function Link({
  text,
  onPress,
  extraStyle,
  readOnly = false,
  color,
  touchStyles,
  centered = true,
}) {
  return (
    <TouchableOpacity
      style={touchStyles}
      onPress={onPress}
      activeOpacity={readOnly ? 1 : 0.7}>
      <Text
        style={[
          styles.Link,
          extraStyle,
          {
            color: color ? color : colors.dimBlue,
            alignSelf: centered ? 'center' : 'flex-start',
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Link: {
    color: '#435CAC',
    margin: 7,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
