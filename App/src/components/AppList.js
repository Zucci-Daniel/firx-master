import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../config/config';
import AppCancel from './AppCancel';
import PlaceHolderParagraph from './PlaceHolderParagraph';

const AppList = ({
  text,
  extraInfoStyles,
  onCancel,
  size = 20,
  iconName = 'close',
  color,
  extraTextStyles,
  extraCancelStyles,
}) => {
  return (
    <View style={[styles.infoWrapper, extraInfoStyles]}>
      <PlaceHolderParagraph
        extraStyles={[styles.info, extraTextStyles]}
        text={text}
      />

      <AppCancel
        iconName={iconName}
        size={size}
        color={color}
        extraStyle={[styles.cancel, extraCancelStyles]}
        onCancel={onCancel}
      />
    </View>
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
