import React from 'react';
import {StyleSheet, View} from 'react-native';
import PostActionIcon from './PostActionIcon';
import {
  height,
  universalPadding,
  width,
  colors,
  postHeight,
} from '../config/config';
import Sheet from './Sheet';
import {MenuItem} from '../imports/all_files';

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
  onRepost = () => {
    console.log('repost');
  },
  onUnfollow = () => {
    console.log('unFollow');
  },
  iAuthoredThis = true,
  onDeletePost = () => {
    console.log('delete');
  },
  onPostInfo = () => {
    console.log('info');
  },
  sheetRef,
}) => {
  const size = width / 10;

  const authoredPostActions = [
    {
      title: 'Copy post link',
      onPress: onCopyPostLink,
      iconName: 'content-copy',
    },
    {
      title: 'More info',
      onPress: onPostInfo,
      iconName: 'info-outline',
    },
    {
      title: 'Delete',
      onPress: onDeletePost,
      iconName: 'delete',
      color: colors.calmRed,
      iconColor: colors.calmRed,
    },
  ];
  const unAuthoredPostActions = [
    {
      title: 'Copy post link',
      onPress: onCopyPostLink,
      iconName: 'content-copy',
    },
    {
      title: 'Save',
      onPress: onSavePost,
      iconName: 'save-alt',
    },

    {
      title: 'Repost',
      onPress: onRepost,
      iconName: 'repeat',
    },
    {
      title: 'Unfollow',
      onPress: onUnfollow,
      iconName: 'person-remove',
      color: colors.calmRed,
      iconColor: colors.calmRed,
    },
    {
      title: 'Stop seeing this',
      onPress: onStopSeeingThis,
      iconName: 'remove-red-eye',
      color: colors.calmRed,
      iconColor: colors.calmRed,
    },
    {
      title: 'Report',
      onPress: null,
      iconName: 'report-problem',
      color: colors.calmRed,
      iconColor: colors.calmRed,
    },
  ];

  return (
    <Sheet sheetRef={sheetRef}>
      <View style={[styles.container, {height: undefined}]}>
        {iAuthoredThis && (
          <View style={styles.actionRow}>
            {authoredPostActions.map((action, index) => (
              <MenuItem
                key={index}
                title={action.title}
                optionColor={action.color ? action.color : colors.pureWhite}
                iconColor={
                  action.iconColor ? action.iconColor : colors.pureWhite
                }
                onPress={action.onPress}
                iconName={action.iconName}
              />
            ))}
          </View>
        )}
        {iAuthoredThis == false && (
          <>
            <View style={styles.actionRow}>
              {unAuthoredPostActions.map((action, index) => (
                <MenuItem
                  key={index}
                  title={action.title}
                  onPress={action.onPress}
                  iconName={action.iconName}
                  optionColor={action.color ? action.color : colors.pureWhite}
                  iconColor={
                    action.iconColor ? action.iconColor : colors.pureWhite
                  }
                />
              ))}
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
    paddingVertical: universalPadding / 2,
    paddingHorizontal: universalPadding / 4,
    width: width,
    backgroundColor: colors.skeletonAnimationBg,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  actionRow: {
    width: '100%',
  },
});
