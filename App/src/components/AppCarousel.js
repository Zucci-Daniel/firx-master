import React, { useState } from 'react';

import { StyleSheet, View, Text } from 'react-native';

import { width, colors, postHeight } from '../config/config';

import { FlatList, Image } from 'react-native';
import AppPostImage from './AppPostImage';
import AppPostVideo from './AppPostVideo';

const AppCarousel = ({
  useData = [],
  shouldPlaySecondCondition = index => { },
  children,
  horizontal = true,
}) => {
  const [currentMedia, setCurrentMedia] = useState(1);

  const getCurrentIndex = event => {
    const index = Math.floor(
      event.nativeEvent.contentOffset.x /
      event.nativeEvent.layoutMeasurement.width,
    );
    setCurrentMedia(index + 1);
  };
  const renderItem = (item, index) => {
    return item.type == 'picture' ? (
      <AppPostImage key={item.id} useHeight={'100%'} imageUri={item?.url} />
    ) : (
      <>
        <AppPostVideo
          shouldPlay={false}
          key={item.id}
          useHeight={'100%'}
          videoUri={item?.url}
          thumbnail={item?.thumbnail}
        />
      </>
    );
  };

  return (
    <View
      style={{
        height: useData.length > 0 ? postHeight : undefined,
        width: width,
      }}>
      {useData.length > 1 && (
        <Text
          style={
            styles.imageIndicator
          }>{`${currentMedia}/${useData.length}`}</Text>
      )}
      <FlatList
        extraData={useData}
        style={styles.FlatList}
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        data={useData}
        initialNumToRender={3}
        horizontal={horizontal}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => renderItem(item, index)}
        snapToAlignment="start"
        decelerationRate={0.8}
        snapToInterval={width}
        onMomentumScrollEnd={event => getCurrentIndex(event)}
      />
    </View>
  );
};

export default AppCarousel;

const styles = StyleSheet.create({
  imageIndicator: {
    color: 'white',
    backgroundColor: colors.neonBg,
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: 10,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
    padding: 5,
    borderRadius: 2,
    margin: 5,
  },
  FlatList: {
    // flex: 1,
    backgroundColor: colors.skeletonBg,
  },
});
