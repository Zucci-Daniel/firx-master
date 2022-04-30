import {
  React,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from '../imports/all_RnComponents';
import {Avatar, Subheading} from '../imports/all_packages';
import {WinsAndGames, AppImage} from '../imports/all_files';
import {colors, universalPadding, brandFont, width} from '../config/config';
import {SignUpInfoContext} from '../screens/forms/signUpInfoContext';
import {useContext} from 'react';

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
