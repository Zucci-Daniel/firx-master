import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {brandFont, colors, universalPadding} from '../config/config';

const Follow = ({detail = 'followers', value = '534', onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.figure}>{value}k</Text>
      <Text style={styles.detial}>{detail}</Text>
    </TouchableOpacity>
  );
};

export default Follow;
const styles = StyleSheet.create({
  container: {
    height: undefined,
    width: undefined,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: universalPadding / 3,
  },
  figure: {
    fontSize: 28,
    fontFamily: brandFont.mediumBold,
  },
  detial: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: brandFont.mediumBold,
    color: colors.info,
  },
});
