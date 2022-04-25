import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {avatarWidth, colors, universalPadding} from '../../../config/config';

const PosterInitials = ({
  onTapInitials,
  name = 'Zucci Daniel',
  location = 'london africa',
  date = '22/3/100',
  showSeperator = true,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.4} onPress={onTapInitials}>
      <View style={styles.initials}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.date}>
          {date} {`${showSeperator ? `|` : `-`}`}
          <Text style={styles.location}> {location}</Text>
        </Text>
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
    fontWeight: '600',
    fontSize: 10,
    textTransform: 'capitalize',
  },
  date: {
    color: '#aec9eb',
    fontWeight: '300',
    textTransform: 'lowercase',
    fontSize: 10,
  },
  location: {
    color: colors.initials,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});
