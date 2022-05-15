import React from 'react';

import {TouchableOpacity, StyleSheet} from 'react-native';
import TagIcon from '../../assets/svg-raw/tag.svg';

const Tag = ({onPress}) => {
  return <TagIcon width={100} height={100} style={styles.tag} />;
};

export default Tag;

const styles = StyleSheet.create({
  tag: {
    position: 'absolute',
    left: -50,
  },
});
