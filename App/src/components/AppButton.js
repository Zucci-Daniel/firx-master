import React from 'react';
import {StyleSheet} from 'react-native';
import {universalPadding, sMargin, colors} from '../config/config';
import {Button} from '../imports/all_packages';

export default AppButton = ({
  extraStyles,
  children,
  onPress,
  buttonColor = colors.hairLineColor,
  title = 'Sign Up',
  disabled = false,
  wideButton = false,
  mode = 'contained',
  titleColor = colors.brandColor,
  extraInnerStyle,
  ...props
}) => {
  return (
    <Button
      // compact={true}
      disabled={disabled}
      mode={mode}
      onPress={onPress}
      style={[
        styles.AppButton,
        {width: wideButton ? '100%' : null},
        extraStyles,
      ]}
      labelStyle={{color: disabled ? 'grey' : titleColor}}
      contentStyle={[styles.innerButton, extraInnerStyle]}
      color={buttonColor}
      {...props}>
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  AppButton: {
    width: undefined,
    alignSelf: 'center',
    margin: universalPadding,
    borderRadius: 40,
  },
  innerButton: {
    paddingVertical: sMargin,
  },
});
