import {React, StyleSheet, View, Text} from '../imports/all_RnComponents';
import {Textarea} from '../imports/all_packages';
import {universalPadding, width, sMargin, colors} from '../config/config';

export default AppTextArea = ({
  onChange,
  placeHolder,
  showShadow = true,
  extraTextAreaStyles,
  extraContainerStyles,
  // value,
  value,
}) => {
  const shadow = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  };

  return (
    <Textarea
      containerStyle={[
        styles.textareaContainer,
        extraContainerStyles,
        // showShadow ? shadow : null,
      ]}
      style={[styles.textarea, extraTextAreaStyles]}
      onChangeText={onChange}
      // defaultValue={defaultValue}
      value={value}
      // maxLength={120}
      placeholder={placeHolder}
      placeholderTextColor={'gray'}
      underlineColorAndroid={'transparent'}
    />
  );
};

const styles = StyleSheet.create({
  textareaContainer: {
    padding: universalPadding / 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairLineGray,
    borderWidth: 0,
  },
  textarea: {
    fontSize: 16,
    color: colors.fadeWhite,
    fontWeight: '400',
  },
});
