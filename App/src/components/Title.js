import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Subheading} from '../imports/all_packages';
import {universalPadding} from '../config/config';

export default function Title({Title, extraTitleStyle}) {
  return (
    <Subheading style={[styles.Title, extraTitleStyle]}>{Title}</Subheading>
  );
}

const styles = StyleSheet.create({
  Title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
});
