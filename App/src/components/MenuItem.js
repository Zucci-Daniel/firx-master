import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { List, MaterialIcons } from '../imports/all_packages';
import {
  colors,
  universalPadding,
  menuIconSize,
  brandFont,
} from '../config/config';

export default function MenuItem({
  onPress,
  title = 'title',
  iconName = 'receipt',
  icon,
  optionColor,
  iconColor,
  optionPadding,
  disabled = false
}) {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : .7}
      onPress={onPress}
      style={[styles.container, { paddingVertical: optionPadding, }]}>
      <List.Item
        titleStyle={[styles.Option, { color: disabled ? 'gray' : optionColor }]}
        title={title}
        left={props => (
          <List.Icon
            {...props}
            icon={({ color }) =>
              icon ? (
                icon
              ) : (
                <MaterialIcons
                  name={iconName}
                  size={menuIconSize}
                  color={(iconColor && !disabled) ? iconColor : disabled ? 'gray' : colors.calmBlue}
                />
              )
            }
          />
        )}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: universalPadding / 3,
  },
  Option: {
    textTransform: 'capitalize',
    color: colors.pureWhite,
    fontSize: 16,
    fontWeight: '700',
  },
});
