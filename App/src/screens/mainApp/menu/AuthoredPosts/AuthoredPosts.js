import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, ScrollView, FlatList, Text} from 'react-native';
import {colors, universalPadding, width} from '../../../../config/config';
import firestore from '@react-native-firebase/firestore';
import {AppContext} from './../../../../appContext';
import SponsorPost from './../../../../components/SponsorPost';
import {commonFunctions} from '../../../../imports/all_files';
import AppLoading from './../../../../components/AppLoading';
import Link from './../../../../components/Link';
import {useNavigation} from '@react-navigation/native';
import {SheetManager} from 'react-native-actions-sheet';
import {
  handleDeletePost,
  handleUnfollowAuthor,
} from '../../../../hooks/postOperations';
import {
  handleSavePost,
  confirmAction,
} from './../../../../hooks/postOperations';
import PostActions from '../../../../components/PostActions';
import Feed from './../../../../components/Feed';
import FeedLoadingSkeleton from './../../../../components/FeedLoadingSkeleton';
///use a flast list

const AuthoredPosts = () => {
  const navigation = useNavigation();
  const [authoredPosts, setAuthoredPosts] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true); //use this state to show a loading animation.

  const {userUID} = useContext(AppContext);

  useEffect(() => {
    try {
      firestore()
        .collection('AllPosts')
        .where('posterUserUID', '==', userUID)
        .onSnapshot(querySnapshot => {
          let posts = [];
          querySnapshot.forEach(postSnapShot => {
            posts.push({
              item: {
                ...postSnapShot.data(),
              },
              type: 'normal',
            });
          });
          setAuthoredPosts(posts);
          setIsFetchingData(false);
        });
    } catch (error) {
      commonFunctions.showToast(
        'failed to get your posts.',
        error.message,
        'error',
      );
    }

    return () => {};
  }, []);

  if (isFetchingData) return <FeedLoadingSkeleton />;

  return (
    <View style={styles.container}>
      {authoredPosts.length > 0 ? (
        <Feed
          useData={authoredPosts}
          userUID={userUID}
          // loadMoreData={handleLoadMoreData}
          // loading={() =>
          //   postIsFinished == false ? <MiniLoading /> : <Finished />
          // }
        />
      ) : (
        <Link
          text={'no recent post yet, create a post'}
          onPress={() => navigation.navigate('createPost')}
        />
      )}
    </View>
  );
};

export default AuthoredPosts;

const styles = StyleSheet.create({
  container: {
    height: undefined,
    backgroundColor: colors.neonBg,
    width: width,
  },
});
