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
import {getDocSnapshot} from './../../../../hooks/useOperation';
import Feed from './../../../../components/Feed';
import FeedLoadingSkeleton from './../../../../components/FeedLoadingSkeleton';
///use a flast list

const SavedPosts = () => {
  const navigation = useNavigation();
  const [savedPosts, setSavedPosts] = useState([]);
  const [mySavedPostsIDs, setMySavedPostsIDs] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(true); //use this state to show a loading animation.

  const {userUID} = useContext(AppContext);

  //try refactoring this.
  useEffect(() => {
    //get the snapShot of his saved posts from his doc
    const subscriber = firestore()
      .collection('STUDENTS')
      .doc(userUID)
      .onSnapshot(documentSnapshot => {
        setMySavedPostsIDs(documentSnapshot.data().postsSaved);
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    try {
      if (mySavedPostsIDs !== null) {
        firestore()
          .collection('AllPosts')
          .where('postID', 'in', mySavedPostsIDs)
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
            setSavedPosts(posts);
            return setIsFetchingData(false);
          });
      } else return;
    } catch (error) {
      setIsFetchingData(false);
    }

    return () => {};
  }, [mySavedPostsIDs]);

  const _deletePost = (postID, deleteAction) => {
    hideSheet();
    confirmAction(postID, deleteAction);
  };

  if (isFetchingData) return <FeedLoadingSkeleton />;

  return (
    <View style={styles.container}>
      {savedPosts.length > 0 ? (
        <Feed useData={savedPosts} userUID={userUID} />
      ) : (
        <Text>no recent post yet, create a post</Text>
      )}
    </View>
  );
};

export default SavedPosts;

const styles = StyleSheet.create({
  container: {
    height: undefined,
    backgroundColor: colors.neonBg,
    width: width,
  },
});
