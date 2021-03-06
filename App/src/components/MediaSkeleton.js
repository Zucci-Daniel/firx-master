import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors, postHeight, width} from '../config/config';

const MediaSkeleton = ({
  isLoading = true,
  children,
  shouldDisplay = true,
  bg,
  waveColor,
}) => {
  return shouldDisplay ? (
    <SkeletonPlaceholder
      speed={850}
      backgroundColor={bg ? bg : colors.skeletonBg}
      highlightColor={waveColor ? waveColor : colors.skeletonAnimationBg}>
      <SkeletonPlaceholder.Item width={'100%'} height={'100%'}>
        {children}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  ) : null;
};

export default MediaSkeleton;
