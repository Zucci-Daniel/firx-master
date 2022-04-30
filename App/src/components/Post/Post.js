import React from 'react';
import {View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {postSize, colors, width, universalPadding} from '../../config/config';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

const Post = ({
  onTapProfileImage,
  onTapInitials,
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
  onTapPost,
}) => {
  return (
    <Pressable
      hitSlop={{top: 0, bottom: 0, left: 0, right: 0}}
      onPress={onTapPost}>
      <View style={[styles.postContainer, {height: undefined}]}>
        <PostHeader
          profileImage={profileImage}
          onTapProfileImage={onTapProfileImage}
          onTapInitials={onTapInitials}
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
    </Pressable>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    position: 'relative',
    backgroundColor: colors.neonBg,
    width: width,
    alignContent: 'space-between',
    marginBottom: universalPadding / 2,
  },
});
