import React from 'react';
import {StyleSheet} from 'react-native';
import {Input, Ionicons} from '../imports/all_packages';
import {
  colors,
  sMargin,
  inputBorder,
  brandFont,
  menuIconSize,
  universalPadding,
} from '../config/config';

export default AppInput2 = ({
  label = 'Email',
  value,
  onChange,
  extraStyles,
  keyboardType,
  mode,
  prefixIcon = false,
  outlineColor = colors.hairLineGray,
  activeOutlineColor = colors.brandBg,
  showIcon = true,
  iconColor = 'black',
  iconName = 'logo-twitter',
  placeholder = 'placeholder',
}) => {
  return (
    <Input
      keyboardType={keyboardType}
      containerStyle={[styles.containerStyle]}
      inputStyle={[styles.inputStyle]}
      inputContainerStyle={[styles.inputContainerStyle]}
      placeholder={placeholder}
      value={value}
      onChangeText={text => onChange(text)}
      leftIcon={
        showIcon ? (
          <Ionicons name={iconName} size={menuIconSize} color={iconColor} />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: inputBorder,
    fontFamily: brandFont.medium,
    fontSize: 10,
    width: '100%',
  },
  inputStyle: {
    fontSize: 14,
    color: 'black',
  },
  inputContainerStyle: {
    backgroundColor: colors.pureWhite,
    padding: universalPadding / 9,
  },
});
