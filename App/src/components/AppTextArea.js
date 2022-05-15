import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Textarea} from '../imports/all_packages';
import {universalPadding, colors} from '../config/config';
import {useRef} from 'react';

export default AppTextArea = ({
  onChange,
  placeHolder,
  showShadow = true,
  extraTextAreaStyles,
  extraContainerStyles,
  // value,
  value,
  useBigFont = false,
  focus = true,
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

  const textAreaRef = useRef(null);

  return (
    <Textarea
      ref={textAreaRef}
      containerStyle={[
        styles.textareaContainer,
        extraContainerStyles,
        // showShadow ? shadow : null,
      ]}
      style={[
        styles.textarea,
        extraTextAreaStyles,
        {fontSize: useBigFont ? 30 : 16},
      ]}
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
    color: colors.fadeWhite,
    fontWeight: '400',
  },
});
