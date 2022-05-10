import React from 'react';
import {View, ScrollView} from 'react-native';
import Skeleton from './Skeleton';
import AppScrollView from './AppScrollView';
import {colors} from '../config/config';

const FeedLoadingSkeleton = () => {
  return (
    <AppScrollView extraScrollStyle={{backgroundColor: colors.neonBg}}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </AppScrollView>
  );
};

export default FeedLoadingSkeleton;
