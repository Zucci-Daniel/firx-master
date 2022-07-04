import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from '../imports/all_packages';
import { colors, sMargin, inputBorder, brandFont } from '../config/config';

export default AppInput = ({
  label = 'Email',
  value,
  onChangeText,
  extraStyles,
  keyboardType,
  mode,
  prefixIcon = false,
  outlineColor = colors.calmBlue,
  activeOutlineColor = colors.calmBlue,
  background,
  iconName = 'camera',
  placeHolderColor,
  textColor,
  ...props
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={text => onChangeText(text)}
      underlineColor={colors.fadeWhite}

      style={[
        styles.TextInput,
        extraStyles,
        { backgroundColor: background ? background : colors.pureWhite },
      ]}
      theme={{
        colors: {
          text: textColor ? textColor : colors.brandBg,
          placeholder: placeHolderColor ? placeHolderColor : colors.calmBlue,
          backdrop: 'red',
          accent: 'green',
          surface: 'red',
          onSurface: 'blue',
          primary: colors.chip,
        },
      }}
      keyboardType={keyboardType}
      mode={mode}
      dense={false}
      outlineColor={outlineColor}
      activeOutlineColor={activeOutlineColor}
      left={prefixIcon ? <TextInput.Icon name={iconName} /> : null}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  TextInput: {
    width: '100%',
    marginVertical: sMargin,
    borderRadius: inputBorder,
    fontFamily: brandFont.medium,
    textTransform: 'capitalize'
  },
});
