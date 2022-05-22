import React from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Subheading} from '../imports/all_packages';

import {
  colors,
  universalPadding,
  brandFont,
  width,
  avatarEditWidth,
} from '../config/config';
import {SignUpInfoContext} from '../screens/forms/signUpInfoContext';
import {useContext} from 'react';
import Follow from './Follow';
import SeparatedButtons from './SeparatedButtons';
import AppImage from './AppImage';

export default function ProfilePane({
  username,
  schoolInfo,
  onPress,
  extraStyle,
  extraNamesWrapperStyle,
  extraUserNameStyle,
  extraNameStyles,
  useDarkUserName,
  useDarkName,
  showBorder = false,
  noPadding = false,
  readOnly = false,
  dark = false,
  bg,
  externalProfileImage,
  profileImageSize,
  onLongPressImage,
  onPressOutImage,
  onPressFollowers,
  onPressFollowing,
}) {
  const {
    user: {firstName, lastName, department, level, profileImage},
  } = useContext(SignUpInfoContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={readOnly ? 1 : 0.2}
      style={noPadding ? null : styles.TouchableOpacity}>
      <View
        style={[
          styles.container,
          {
            borderBottomColor: !showBorder && 'transparent',
            backgroundColor: 'transparent',
          },
          extraStyle,
        ]}>
        <AppImage
          onPressOutImage={onPressOutImage}
          onLongPressImage={onLongPressImage}
          size={avatarEditWidth / 1.3}
          source={externalProfileImage ? externalProfileImage : profileImage}
          readOnly
        />

        <View style={[styles.wrapper, extraNamesWrapperStyle]}>
          <Subheading style={[styles.Subheading, extraUserNameStyle]}>
            {username ? username : `${firstName} ${lastName}`}
          </Subheading>
          <Subheading style={[styles.SuperSubHeading, extraNameStyles]}>
            {schoolInfo ? schoolInfo : `${department} | ${level}Level`}
          </Subheading>
        </View>
      </View>
      <SeparatedButtons extraStyle={{justifyContent: 'space-around'}}>
        <Follow detail="followers" value="219,000" onPress={onPressFollowers} />
        <Follow detail="following" value="21" onPress={onPressFollowing} />
      </SeparatedButtons>
    </TouchableOpacity>
  );
}

const size = width / 10;

const styles = StyleSheet.create({
  TouchableOpacity: {
    paddingVertical: universalPadding / 3,
  },
  container: {
    height: undefined,
    paddingVertical: universalPadding / 6,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairLineColor,
  },
  wrapper: {
    backgroundColor: 'transparent',
    height: undefined,
    width: undefined,
    padding: universalPadding / 6,
  },
  Subheading: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.calmBlue,
    fontFamily: brandFont.semiBold,
  },
  SuperSubHeading: {
    fontSize: 14,
    textTransform: 'capitalize',
    fontWeight: '600',
    color: colors.calmBlue,
    fontFamily: brandFont.semiBold,
  },
});
