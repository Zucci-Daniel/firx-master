import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {colors, universalPadding} from '../config/config';
import Link from './Link';
import PlaceHolderParagraph from './PlaceHolderParagraph';

const SweetButton = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <PlaceHolderParagraph
        text={text}
        color={colors.pureWhite}
        extraStyles={styles.link}
      />
    </TouchableOpacity>
  );
};

export default SweetButton;
const styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
    paddingHorizontal: universalPadding,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    padding: 0,
    color: colors.pureWhite,
    fontWeight: 'bold',
    textTransform:'capitalize'
  },
});
