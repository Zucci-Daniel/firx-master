import React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import {Headline, Subheading} from '../imports/all_packages';
import {universalPadding, width, sMargin, colors} from '../config/config';

export default FormTitle = ({
  title = 'Please Sign Up',
  subheading = 'subheading',
  showSubHeading = true,
  extraStyle,
  color,
  suhHeadingStyles,
}) => {
  return (
    <View style={[styles.container, extraStyle]}>
      <Headline style={[styles.FormTitle, {color: color}]}>{title}</Headline>
      {showSubHeading && (
        <Subheading style={suhHeadingStyles}>{subheading}</Subheading>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: universalPadding,
    alignItems: 'center',
  },
  FormTitle: {
    color: colors.brandBg,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
