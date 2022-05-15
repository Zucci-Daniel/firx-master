import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {universalPadding, colors} from '../config/config';

export default function Notice({
  prefix,
  focus1,
  focus2,
  ending,
  middle,
  onPress,
  useFient = true,
  extraStyle,
  extraFocus1Style,
}) {
  return (
    <Text style={[useFient ? styles.fient : styles.Para, extraStyle]}>
      {prefix}
      <Text style={[styles.focus1, extraFocus1Style]}>{` ${
        focus1 ? focus1 : ''
      } `}</Text>
      {middle}
      <Text style={styles.focus2}>{` ${focus2 ? focus2 : ''} `}</Text>
      {ending}
    </Text>
    // <Text style={styles.Para}>{paragraph}</Text>
  );
}

const styles = StyleSheet.create({
  Para: {
    color: colors.placeHolder,
    alignSelf: 'center',
    margin: universalPadding / 3,
    textTransform: 'capitalize',
  },
  fient: {
    color: colors.placeHolder,
    alignSelf: 'flex-start',
    marginVertical: universalPadding / 2,
    textTransform: 'capitalize',
    fontWeight: '300',
  },
  focus1: {
    color: colors.brandBg,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  focus2: {
    color: colors.brandBg,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
