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
import PostActions from './PostActions';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {
  confirmAction,
  handleDeletePost,
  handleSavePost,
  handleStopSeeingPost,
  handleUnfollowAuthor,
} from '../hooks/postOperations';
import PostHeader from './Post/PostHeader';
import PosterInitials from './Post/utils/PosterInitials';

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
    dataProvider: new DataProvider((r1, r2) => {
      r1.item.postID !== r2.item.postID;
    }),
    mainData: [],
  });
  const [selectedMyPost, setSelectedMyPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const updateState = id => {
    let copiedPost = data.mainData;
    let updatedPosts = copiedPost.filter(item => item.item.postID !== id);
    setData({
      ...data,
      dataProvider: data.dataProvider.cloneWithRows([...updatedPosts]),
      mainData: [...updatedPosts],
    });
  };
  const updateStateForUnfollow = posterID => {
    let copiedPost = data.mainData;
    let updatedPosts = copiedPost.filter(
      item => item.item.posterUserUID !== posterID,
    );
    setData({
      ...data,
      dataProvider: data.dataProvider.cloneWithRows([...updatedPosts]),
      mainData: [...updatedPosts],
    });
  };

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
    handleLayoutProvider.shouldRefreshWithAnchoring = false;
    setData({
      ...data,
      dataProvider: data.dataProvider.cloneWithRows([...useData]),
      mainData: [...useData],
    });
  }, [useData]);

  // useEffect(() => {
  //   handleLayoutProvider.shouldRefreshWithAnchoring = false;
  //   setData({
  //     ...data,
  //     dataProvider: data.dataProvider.cloneWithRows([
  //       ...data.mainData,
  //       ...useData,
  //     ]),
  //     mainData: [...data.mainData, ...useData],
  //   });
  // }, [useData]);

  const closeSheet = () => sheetRef.current.close();

  const toggleSheet = (posterID, userUID, item) => {
    sheetRef.current.open();
    console.log(posterID, item);
    setSelectedPost({...item});
    setSelectedMyPost(posterID == userUID ? true : false);
  };

  const _deletePost = (postID, deleteAction) => {
    closeSheet();
    updateState(postID);
    confirmAction(postID, deleteAction);
  };
  const _savePost = (postID, userUID) => {
    closeSheet();
    console.log('saving');
    handleSavePost(postID, userUID);
  };
  const _unFollow = (posterUID, userUID, posterName) => {
    closeSheet();
    handleUnfollowAuthor(posterUID, userUID, posterName);
    updateStateForUnfollow(posterUID);
  };
  const _stopSeeingThis = (postID, userUID) => {
    closeSheet();
    updateState(postID);
    handleStopSeeingPost(postID, userUID);
  };

  const handleRowRender = (type, data, index, extendedState) => {
    const {item, type: innerType} = data;

    return (
      <>
        <Post
          onPressPostMenu={() => toggleSheet(item.posterUserUID, userUID, item)}
          onTapPost={() =>
            navigation.navigate('viewPost', {
              postId: item.postID,
              selectedUser: item.posterName,
            })
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
          onDeletePost={() =>
            _deletePost(selectedPost.postID, handleDeletePost)
          }
          onSavePost={() => _savePost(selectedPost.postID, userUID)}
          onUnfollow={() =>
            _unFollow(
              selectedPost.posterUserUID,
              userUID,
              selectedPost.posterName,
            )
          }
          onStopSeeingThis={() => _stopSeeingThis(selectedPost.postID, userUID)}
          onPostInfo={() => console.log('info ready')}>
          <PosterInitials
            extraInitialsStyles={styles.extraInitialsStyles}
            name={`perform actions for ${selectedPost?.posterName}`}
            showDateAndLocation={false}
          />
        </PostActions>
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
            extendedState={{
              selectedMyPost: selectedMyPost,
              selectedPost: selectedPost,
              postArray: data.dataProvider,
            }}
            onEndReachedThreshold={1}
            renderFooter={loading}
            renderAheadOffset={1000}
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
    backgroundColor: colors.neonBg,
  },
  extraInitialsStyles: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
