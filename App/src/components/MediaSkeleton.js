import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors, postHeight, width} from '../config/config';
import Post from './Post/Post';

const MediaSkeleton = ({isLoading = true, children, shouldDisplay = true}) => {
  return shouldDisplay ? (
    <SkeletonPlaceholder
      speed={850}
      backgroundColor={colors.skeletonBg}
      highlightColor={colors.skeletonAnimationBg}>
      <SkeletonPlaceholder.Item width={'100%'} height={'100%'}>
        {children}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  ) : null;
};

export default MediaSkeleton;
