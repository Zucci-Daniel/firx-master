import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../config/config';
import AppCancel from './AppCancel';
import PlaceHolderParagraph from './PlaceHolderParagraph';
import MiniLoading from './MiniLoading';
import AppIndicator from './AppIndicator';

const AppList = ({
  text,
  extraInfoStyles,
  onCancel,
  size = 20,
  iconName = 'close',
  color,
  extraTextStyles,
  extraCancelStyles,
  loading = false,
  useDefault = true,
  children,
  textColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      style={[styles.infoWrapper, extraInfoStyles]}
      onPress={onPress}>
      <PlaceHolderParagraph
        extraStyles={[styles.info, {color: textColor}, extraTextStyles]}
        text={text}
      />

      {useDefault ? (
        <AppCancel
          iconName={iconName}
          size={size}
          color={color}
          extraStyle={[styles.cancel, extraCancelStyles]}
          onCancel={onCancel}
        />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default AppList;

const styles = StyleSheet.create({
  infoWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: undefined,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  info: {
    color: colors.info,
    width: '90%',
  },
  cancel: {
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: -8,
  },
});
