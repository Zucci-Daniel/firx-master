import React, {useState, useRef, useCallback, useMemo} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {universalPadding, height, colors} from '../config/config';
import AppLoading from './AppLoading';
import Post from './Post/Post';
import AppCarousel from './AppCarousel';
import BottomSheet from '@gorhom/bottom-sheet';
import ListSeparator from './ListSeparator';
const viewabilityConfig = {viewAreaCoveragePercentThreshold: 50};

const Feed = ({useData = [], userUID}) => {
  const flatRef = React.useRef(null);

  const navigation = useNavigation();
  const [currentScrolledVideo, setCurrentScrolledVideo] = useState(0);

  // const onViewableItemsChanged = flatRef.current.onViewableItemsChanged(
  //   (viewableItems) => console.log('see what im viewing ', viewableItems),
  // );

  const getCurrentIndex = event => {
    const index = Math.floor(event.nativeEvent.contentOffset.y / 0.5);
    setCurrentScrolledVideo(index.toString()[0]);
  };

  const handleShouldPlay = index => (currentScrolledVideo ? true : false);

  const handleRepost = (postID, postImage, postCaption) => {
    hideSheet(postID);
    navigation.navigate('createPost', {
      repostID: postID,
      repostImage: postImage,
      repostCaption: postCaption,
    });
  };
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '40%'], []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const renderItem = (item, userUID) => {
    return (
      <Post
        key={item.id}
        onPressPostMenu={() => handleSnapPress(1)}
        onTapPost={() => navigation.navigate('viewPost', {postId: item.postID})}
        onPush={() => null} //use transaction for this.
        profileImage={item.posterAvatar}
        name={item.posterName}
        caption={item.postCaption}
        date={'today :23:00pm wat'}>
        <AppCarousel
          useData={item.postMedias}
          shouldPlaySecondCondition={index => handleShouldPlay(index)}
        />
      </Post>
    );
  };

  return (
    <>
      {useData.length > 0 ? (
        <FlatList
          ref={flatRef}
          // onViewableItemsChanged={onViewableItemsChanged}
          // viewabilityConfig={viewabilityConfig}
          // pagingEnabled={true}
          onMomentumScrollEnd={event => getCurrentIndex(event)}
          initialScrollIndex={0}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          showsVerticalScrollIndicator={false}
          data={useData}
          keyExtractor={item => item.postID}
          renderItem={({item}) => renderItem(item, userUID)}
          ItemSeparatorComponent={seperator}
          extraData={useData}
        />
      ) : (
        <AppLoading message="oops no post available" loop={false} />
      )}
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={{backgroundColor: 'red'}}
        onChange={handleSheetChanges}>
        <View style={{backgroundColor: 'black', flex: 1, zIndex: 100}}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </>
  );
};

export default Feed;

const seperator = () => <ListSeparator />;


const styles = StyleSheet.create({});
