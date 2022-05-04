import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Paragraph} from 'react-native-paper';
import {colors} from '../config/config';

const PlaceHolderParagraph = ({extraStyles, text}) => {
  return <Paragraph style={[styles.para,extraStyles]}>{text}</Paragraph>;
};

export default PlaceHolderParagraph;

const styles = StyleSheet.create({
  para: {
    color: colors.info,
  },
});
