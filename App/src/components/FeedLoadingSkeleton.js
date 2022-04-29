import React from 'react';
import {View, ScrollView} from 'react-native';
import Skeleton from './Skeleton';

const FeedLoadingSkeleton = () => {
  return (
    <ScrollView>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </ScrollView>
  );
};

export default FeedLoadingSkeleton;
