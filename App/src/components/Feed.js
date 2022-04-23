import React, {useState, useRef, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  universalPadding,
  height,
  colors,
  postHeight,
  width,
  postSize,
} from '../config/config';
import Post from './Post/Post';
import AppCarousel from './AppCarousel';
import ListSeparator from './ListSeparator';
import PostActions from './PostActions';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {
  confirmAction,
  handleDeletePost,
  handleSavePost,
  handleStopSeeingPost,
  handleUnfollowAuthor,
} from '../hooks/postOperations';

const Feed = ({
  useData = [],
  userUID,
  loading,
  loadMoreData = () => {
    console.log('nothing is lodeing');
  },
}) => {
  const navigation = useNavigation();
  const sheetRef = useRef(null);

  const [data, setData] = useState({
    dataProvider: new DataProvider((r1, r2) => r1 !== r2),
    mainData: [],
  });
  const [selectedMyPost, setSelectedMyPost] = useState(false);

  const [handleLayoutProvider] = useState(
    new LayoutProvider(
      index => {
        return index;
      },
      (type, dim) => {
        dim.width = 0;
        dim.height = 0;
      },
    ),
  );

  useEffect(() => {
    // handleLayoutProvider.shouldRefreshWithAnchoring = false;
    console.log('frank');
    setData({
      ...data,
      dataProvider: data.dataProvider.cloneWithRows([
        ...data.mainData,
        ...useData,
      ]),
      mainData: [...data.mainData, ...useData],
    });
  }, [useData]);

  const toggleSheet = (posterID, userUID) => {
    setSelectedMyPost(posterID == userUID ? true : false);
    sheetRef.current.open();
  };

  const handleRowRender = (type, data, index, extendedState) => {
    const {item, type: innerType} = data;

    const _deletePost = (postID, deleteAction) => {
      console.log('deleting');
      confirmAction(postID, deleteAction);
    };
    const _savePost = (postID, userUID) => {
      console.log('saving');
      handleSavePost(postID, userUID);
    };
    const _unFollow = (posterUID, userUID, posterName) => {
      console.log('unfollow');
      handleUnfollowAuthor(posterUID, userUID, posterName);
    };
    const _stopSeeingThis = (postID, userUID) => {
      console.log('stop seeing this', postID);
      handleStopSeeingPost(postID, userUID);
    };

    return (
      <>
        <Post
          key={item.id}
          onPressPostMenu={() => toggleSheet(item.posterUserUID, userUID)}
          onTapPost={() =>
            navigation.navigate('viewPost', {postId: item.postID})
          }
          onPush={() => null} //use transaction for this.
          profileImage={item.posterAvatar}
          name={item.posterName}
          caption={item.postCaption}
          date={'today :23:00pm wat'}>
          <AppCarousel
            useData={item.postMedias}
            shouldPlaySecondCondition={null}
          />
        </Post>
        <PostActions
          sheetRef={sheetRef}
          iAuthoredThis={extendedState.selectedMyPost}
          onDeletePost={() => _deletePost(item.postID, handleDeletePost)}
          onSavePost={() => _savePost(item.postID, userUID)}
          onUnfollow={() =>
            _unFollow(item.posterUserUID, userUID, item.posterName)
          }
          onStopSeeingThis={() => _stopSeeingThis(item.postID, userUID)}
          onPostInfo={() => console.log('info ready')}
        />
      </>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {data.dataProvider._data.length !== 0 ? (
          <RecyclerListView
            style={{flex: 1}}
            forceNonDeterministicRendering={true} //to make sure it fits the height of it's content
            dataProvider={data.dataProvider}
            layoutProvider={handleLayoutProvider}
            rowRenderer={handleRowRender}
            onEndReached={() => loadMoreData()}
            extendedState={{selectedMyPost: selectedMyPost}}
            onEndReachedThreshold={0.5}
            renderFooter={loading}
            renderAheadOffset={200}
            scrollViewProps={{
              showsVerticalScrollIndicator: false,
              initialNumToRender: 4,
              removeClippedSubviews: true,
            }}
          />
        ) : null}
      </View>
    </>
  );
};

// const handleRepost = (postID, postImage, postCaption) => {
//   navigation.navigate('createPost', {
//     repostID: postID,
//     repostImage: postImage,
//     repostCaption: postCaption,
//   });
// };

// const _respost = (postID, postImage, postCaption) => {
//   handleRepost(postID, postImage, postCaption);
// };

export default Feed;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingBottom: universalPadding,
  },
});
