import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import AppPostVideo from './AppPostVideo';
import AppPostImage from './AppPostImage';
import {
  colors,
  height,
  postHeight,
  universalPadding,
  width,
} from '../config/config';
import AppCancel from './AppCancel';

const AppMediaDisplay = ({data, onRemoveItem, showRemove = true}) => {
  const flatListRef = React.useRef();
  return (
    <FlatList
      style={data.length ? styles.FlatList : null}
      ref={flatListRef}
      onContentSizeChange={() =>
        flatListRef.current.scrollToEnd({animated: true})
      }
      data={data}
      horizontal={true}
      keyExtractor={item => `${item.id} ${item} `}
      snapToAlignment="start"
      decelerationRate={0.8}
      snapToInterval={width}
      pagingEnabled={true}
      renderItem={({item}) => (
        <>
          {showRemove && (
            <AppCancel
              size={30}
              iconName="trash"
              extraStyle={styles.trash}
              onCancel={() => onRemoveItem(item.id)}
            />
          )}
          {(item.mime == 'picture' || item.type == 'picture') && (
            <AppPostImage
              key={item}
              imageUri={item.url || item.path}
              useHeight={'100%'}
            />
          )}
          {(item.mime == 'video' || item.type == 'video') && (
            <AppPostVideo
              key={item}
              videoUri={item.url || item.path}
              useHeight={'100%'}
            />
          )}
        </>
      )}
    />
  );
};

export default AppMediaDisplay;

const styles = StyleSheet.create({
  FlatList: {
    marginTop: universalPadding / 2,
    height: postHeight,
  },
  trash: {
    right: 10,
    bottom: 0,
  },
});
