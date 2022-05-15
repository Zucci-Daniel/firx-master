import React from 'react';
import {
 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Headline, Subheading, Avatar} from '../imports/all_packages';
import {
  universalPadding,
  width,
  sMargin,
  colors,
  brandFont,
} from '../config/config';

export default LeaderBoardPane = ({
  username = '@beauty fred',
  image,
  leadPoints = 15,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Avatar.Image source={require('../assets/1.jpg')} />
        </View>
        <View style={styles.name}>
          <Subheading style={styles.username}>{username}</Subheading>
        </View>
        <View style={styles.points}>
          <Text style={styles.wins}>Wins</Text>
          <Headline style={styles.leadPoints}>{leadPoints}</Headline>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: universalPadding / 5,
    backgroundColor: colors.fadedWhite,
    position: 'relative',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: colors.hairLineGray,
  },
  imageWrapper: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    width: '60%',
    justifyContent: 'center',
  },
  username: {
    color: colors.hairLineColor,
    fontFamily: brandFont.medium,
  },
  leadPoints: {
    fontFamily: brandFont.medium,
    color: colors.hairLineColor,
  },
  points: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: brandFont.medium,
  },
  wins: {
    fontSize: 10,
    color: 'gray',

    fontFamily: brandFont.medium,
  },
});
