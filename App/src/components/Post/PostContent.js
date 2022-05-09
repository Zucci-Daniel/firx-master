import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  brandFont,
  colors,
  height,
  postHeight,
  postSize,
  universalPadding,
  width,
} from '../../config/config';
import AppCarousel from './../AppCarousel';

const PostContent = ({caption = 'fdfsfsdfs', postMedias = null, children}) => {
  return (
    <>
      {caption ? (
        <View style={styles.descriptionArea}>
          <Text style={styles.desc}>{caption}</Text>
        </View>
      ) : null}
      {postMedias ? children : null}
    </>
  );
};

export default PostContent;

const styles = StyleSheet.create({
  postContent: {
    backgroundColor: 'transparent',
    width: '100%',
    height: undefined,
    padding: 5,
  },
  descriptionArea: {
    paddingVertical: universalPadding / 10,
    paddingHorizontal: universalPadding / 7,
    height: undefined,
    width: '100%',
  },
  desc: {
    color: colors.pureWhite,
    // fontWeight: '300',
    fontFamily: brandFont.mediumBold,
    fontSize: 16,
  },
  postMediaWrapper: {
    width: '90%',
    height: undefined,
    backgroundColor: 'indigo',
  },
});
