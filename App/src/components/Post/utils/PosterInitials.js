import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  avatarWidth,
  brandFont,
  colors,
  universalPadding,
} from '../../../config/config';

const PosterInitials = ({
  onTapInitials,
  name = 'Zucci Daniel',
  location = '',
  date = '22/3/100',
  showName = true,
  showDateAndLocation = true,
  extraInitialsStyles, nameColor
}) => {
  return (
    <TouchableOpacity activeOpacity={0.4} onPress={onTapInitials}>
      <View style={styles.initials}>
        <Text style={[styles.name, nameColor && { color: nameColor }, extraInitialsStyles]}>{name}</Text>
        {showDateAndLocation && (
          <Text style={styles.date}>
            {date} {date && location && <Text>|</Text>}
            <Text style={styles.location}> {location}</Text>
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PosterInitials;

const styles = StyleSheet.create({
  initials: {
    width: '100%',
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    padding: universalPadding / 8,
  },

  name: {
    color: colors.initials,
    fontSize: 12,
    fontFamily: brandFont.mediumBold,
    textTransform: 'capitalize',
  },
  date: {
    color: '#aec9eb',
    fontWeight: '400',
    textTransform: 'capitalize',
    fontSize: 10,
  },
  location: {
    color: colors.initials,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});
