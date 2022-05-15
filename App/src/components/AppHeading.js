import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Headline, Subheading} from '../imports/all_packages';
import {
  universalPadding,
  width,
  sMargin,
  colors,
  brandFont,
} from '../config/config';

export default AppHeading = ({
  title = "quiz start's in",
  whiteMode = false,
  extraStyles,
}) => {
  return (
    <Headline
      style={[
        styles.balance,
        {color: whiteMode ? colors.brandColor : colors.brandBg},
        extraStyles,
      ]}>
      {title}
    </Headline>
  );
};

const styles = StyleSheet.create({
  balance: {
    textTransform: 'capitalize',
    fontSize: 25,
    fontFamily: brandFont.medium,
  },
});
