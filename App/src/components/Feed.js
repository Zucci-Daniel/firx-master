import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, width } from '../config/config';
import Post from './Post/Post';
import AppCarousel from './AppCarousel';
import PostActions from './PostActions';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import {
  handleDeletePost,
  handleSavePost,
  handleStopSeeingPost,
  handleUnfollowAuthor,
} from '../hooks/postOperations';
import PosterInitials from './Post/utils/PosterInitials';
import { appShare, convertToReadableDate } from './../functions/commonFunctions';
import Clipboard from '@react-native-community/clipboard';
import { commonFunctions } from '../imports/all_files';

const Feed = ({
  useData = [],
  userUID,
  loading,
  loadMoreData = () => { },
  refreshing,
  onRefresh = () => {
    console.log('refreshing..');
  },
}) => {
  const globalNavigation = useNavigation();
  const sheetRef = useRef(null);

  const [data, setData] = useState({
    dataProvider: new DataProvider((r1, r2) => {
      return r1 !== r2 && r1.item.postID !== r2.item.postID;
    }),
    mainData: [],
  });
  const closeSheet = () => sheetRef.current.close();

  const [selectedMyPost, setSelectedMyPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const updateState = id => {
    setIsUpdating(true);

    let copiedPost = data.mainData;
    let updatedPosts = copiedPost.filter(item => item.item.postID !== id);
    setData({
      ...data,
      dataProvider: data.dataProvider.cloneWithRows([...updatedPosts]),
      mainData: [...updatedPosts],
    });
    setIsUpdating(false);
  };
  const updateStateForUnfollow = posterID => {
    setIsUpdating(true);

    let copiedPost = data.mainData;
    let updatedPosts = copiedPost.filter(
      item => item.item.posterUserUID !== posterID,
    );
    setData({
      ...data,
      dataProvider: data.dataProvider.cloneWithRows([...updatedPosts]),
      mainData: [...updatedPosts],
    });
    setIsUpdating(false);
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
      dataProvider: data.dataProvider.cloneWithRows([
        ...data.mainData,
        ...useData,
      ]),
      mainData: [...data.mainData, ...useData],
    });
  }, [useData]);

  // const toggleSheet = (posterID, userUID, {posterName, postID}) => {
  //   sheetRef.current.open();
  //   // console.log(item.postID);
  //   setSelectedMyPost(posterID == userUID ? true : false);

  //   setSelectedPost({posterName, postID});
  // };
  const toggleSheet = (posterID, userUID, item) => {
    sheetRef.current.open();
    console.log(item.postID);
    setSelectedPost({ ...item });
    setSelectedMyPost(posterID == userUID ? true : false);
  };

  const _deletePost = postID => {
    console.log('about to delte');
    Alert.alert(
      'THIS POST WILL BE DELETED FOREVER!',
      'would you like to proceed?',
      [
        {
          text: "don't delete",
          onPress: closeSheet(),
          style: 'cancel',
        },
        {
          text: ' delete anyways ',
          onPress: async () => {
            const response = await handleDeletePost(postID);
            if (response) {
              updateState(postID);
            }
            closeSheet();
          },
        },
      ],
    );
  };

  const _savePost = (postID, userUID) => {
    closeSheet();
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

  const handleProfileSelection = (posterUID, userUID) => {
    if (posterUID == userUID)
      return globalNavigation.navigate('menu', { screen: 'profile' });
    else
      globalNavigation.navigate('userProfileStack', {
        screen: 'userProfile',
        params: { posterUserUID: posterUID },
      });
  };


  const copyToClipboard = () => {
    Clipboard.setString(`${selectedPost.posterName}`);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };


  const handleCopy = async () => {
    copyToClipboard()
    await fetchCopiedText()
    commonFunctions.showToast('Post Link Copied!', `copied ${copiedText}'s post`, 'success')
  }

  const handleRowRender = (type, data, index, extendedState) => {
    const { item, type: innerType } = data;

    return (
      <>
        <Post
          onTapInitials={() =>
            handleProfileSelection(item.posterUserUID, userUID)
          }
          // onPressPostMenu={() =>
          //   toggleSheet(item.posterUserUID, userUID, {
          //     postID: item.postID,
          //     posterName: item.posterName,
          //   })
          // }
          onPressPostMenu={() => toggleSheet(item.posterUserUID, userUID, item)}
          onTapPost={() =>
            globalNavigation.navigate('viewPost', {
              postId: item.postID,
              selectedUser: item.posterName,
            })
          }
          onPush={() => null} //use transaction for this.
          profileImage={item.posterAvatar}
          name={item.posterName}
          caption={item.postCaption}
          date={convertToReadableDate(item.postedOn)}>
          <AppCarousel
            useData={item.postMedias}
            shouldPlaySecondCondition={null}
          />
        </Post>
        <PostActions
          sheetRef={sheetRef}
          iAuthoredThis={extendedState.selectedMyPost}
          onCopyPostLink={handleCopy}
          onPostShare={() => appShare(selectedPost.posterName)}
          onDeletePost={() => _deletePost(selectedPost.postID)}
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
            name={`perform actions for ${selectedPost?.posterName}'s post`}
            showDateAndLocation={false}
          />
        </PostActions>
      </>
    );
  };

  const getCurrentIndex = event => {
    const index = Math.floor(
      event.nativeEvent.contentOffset.y /
      event.nativeEvent.layoutMeasurement.height,
    );
    // setCurrentMedia(index + 1);
  };

  const refreshHandler = React.useCallback(() => {
    onRefresh();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {data.dataProvider._data.length !== 0 ? (
          <RecyclerListView
            style={{ backgroundColor: colors.neonBg }}
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
              refreshControl: (
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refreshHandler}
                  progressBackgroundColor={colors.calmBlue}
                />
              ),
            }}
          />
        ) : null}
        {/* {isUpdating ? (
          <View
            style={{
              backgroundColor: 'red',
              width: width,
              height: height,
              zIndex: 300,
            }}
          />
        ) : null} */}
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
    height: '100%',
    backgroundColor: colors.neonBg,
  },
  extraInitialsStyles: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 10,
  },
});
