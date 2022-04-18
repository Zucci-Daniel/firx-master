import React from 'react';
import {View, StyleSheet} from 'react-native';
import {postSize, colors, width} from '../../config/config';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

const Post = ({
  onTapImage,
  profileImage,
  name,
  date,
  location,
  onPressPostMenu,
  caption,
  postMedias = [],
  onShare,
  onPush,
  pushValue,
  onComment,
  extraIconStyles,
  children,
}) => {
  return (
    <View style={[styles.postContainer, {height: undefined}]}>
      <PostHeader
        onTapImage={onTapImage}
        profileImage={profileImage}
        name={name}
        date={date}
        location={location}
        onPressPostMenu={onPressPostMenu}
      />
      <PostContent caption={caption} postMedias={postMedias}>
        {children}
      </PostContent>
      {/* <PostFooter
        onShare={onShare}
        onPush={onPush}
        pushValue={pushValue}
        onComment={onComment}
        extraIconStyles={extraIconStyles}
      /> */}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    position: 'relative',
    backgroundColor: colors.neonBg,
    width: width,
    alignContent: 'space-between',
    
  },
});
