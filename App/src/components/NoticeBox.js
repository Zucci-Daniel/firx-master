import React from 'react';

import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Text as PaperText} from '../imports/all_packages';
import {
  universalPadding,
  width,
  sMargin,
  colors,
  brandFont,
} from '../config/config';

const NoticeBox = ({
  message = ' Game session is starts in 4days time...',
  seen = false,
  date = 'yesterday',
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        styles.noticeContainer,
        {backgroundColor: seen ? 'transparent' : colors.notificationBg},
      ]}>
      <Text
        style={[
          styles.Text,
          {fontFamily: seen ? brandFont.medium : brandFont.medium},
        ]}>
        {message}
      </Text>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
};

export default NoticeBox;

const styles = StyleSheet.create({
  noticeContainer: {
    padding: universalPadding / 5,
    borderBottomColor: colors.hairLineGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
  Text: {
    fontSize: 14,
    color: colors.inputUnderLineColor,
  },
  date: {
    fontSize: 9,
    color: 'gray',
    alignSelf: 'flex-end',
  },
});
