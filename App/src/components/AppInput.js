import {React, StyleSheet} from '../imports/all_RnComponents';
import {TextInput} from '../imports/all_packages';
import {colors, sMargin, inputBorder, brandFont} from '../config/config';

export default AppInput = ({
  label = 'Email',
  value,
  onChangeText,
  extraStyles,
  keyboardType,
  mode,
  prefixIcon = false,
  outlineColor = colors.calmBlue,
  activeOutlineColor =colors.calmBlue,
  background,
  iconName = 'camera',
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
        {backgroundColor: background ? background : colors.pureWhite},
      ]}
      theme={{colors: {text: colors.brandBg}}}
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
    marginVertical: sMargin,
    borderRadius: inputBorder,
    fontFamily: brandFont.medium,
  },
});
