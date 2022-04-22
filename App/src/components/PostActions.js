import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppBottomSheet from './AppBottomSheet';
import PostActionIcon from './PostActionIcon';
import {
  height,
  universalPadding,
  width,
  colors,
  postHeight,
} from '../config/config';
import Sheet from './Sheet';

const PostActions = ({
  onStopSeeingThis = () => {
    console.log('stop seing this');
  },
  onSavePost = () => {
    console.log('save post');
  },
  onCopyPostLink = () => {
    console.log('copy link');
  },
  onHightFive = () => {
    console.log('high five');
  },
  onRepost = () => {
    console.log('repost');
  },
  onUnfollow = () => {
    console.log('unFollow');
  },
  iAuthoredThis = true,
  deletePost = () => {
    console.log('delete');
  },
  onPostInfo = () => {
    console.log('info');
  },
  sheetRef
}) => {
  const size = width / 10;

  return (
    <Sheet sheetRef={sheetRef}>
      <View
        style={[
          styles.container,
          {height: !iAuthoredThis ? postHeight / 1.5 : postHeight / 3},
        ]}>
        {iAuthoredThis && (
          <View style={styles.iAuthoredThisStyles}>
            <PostActionIcon
              iconName="trash"
              columnMode
              size={size}
              value="delete this post"
              onPress={deletePost}
              color={colors.calmRed}
              valueColor={colors.calmRed}
            />
            <PostActionIcon
              iconName="info"
              columnMode
              size={size}
              value="post information"
              onPress={onPostInfo}
              color={colors.info}
              valueColor={colors.info}
            />
            <PostActionIcon
              iconName="copy"
              useDefault
              columnMode
              size={size}
              value="copy post link"
              onPress={onCopyPostLink}
            />
          </View>
        )}
        {iAuthoredThis == false && (
          <>
            <View style={styles.actionRow}>
              <PostActionIcon
                iconName="eye-with-line"
                columnMode
                size={size}
                value="stop seeing this post"
                onPress={onStopSeeingThis}
              />
              <PostActionIcon
                iconName="save"
                columnMode
                size={size}
                value="save this post"
                onPress={onSavePost}
              />
              <PostActionIcon
                iconName="copy"
                useDefault
                columnMode
                size={size}
                value="copy post link"
                onPress={onCopyPostLink}
              />
            </View>
            <View style={styles.actionRow}>
              <PostActionIcon
                iconName="hand"
                columnMode
                size={size}
                value="high 5 this post"
                onPress={onHightFive}
              />
              <PostActionIcon
                iconName="cycle"
                columnMode
                size={size}
                value="repost "
                onPress={onRepost}
              />
              <PostActionIcon
                iconName="circle-with-minus"
                columnMode
                size={size}
                value="unfollow author"
                onPress={onUnfollow}
              />
            </View>
          </>
        )}
      </View>
    </Sheet>
  );
};

export default PostActions;

const styles = StyleSheet.create({
  container: {
    padding: universalPadding / 2,
    width: width,
    backgroundColor: colors.skeletonAnimationBg,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  actionRow: {
    width: '80%',
    justifyContent: 'space-between',
  },
  iAuthoredThisStyles: {
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
