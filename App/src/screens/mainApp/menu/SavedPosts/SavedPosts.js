import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, width } from '../../../../config/config';
import firestore from '@react-native-firebase/firestore';
import { AppContext } from './../../../../appContext';

import { useNavigation } from '@react-navigation/native';

import { confirmAction } from './../../../../hooks/postOperations';

import Feed from './../../../../components/Feed';

import AppIndicator from '../../../../components/AppIndicator';
import Retry from './../../../../components/Retry';
///use a flast list

const SavedPosts = () => {
  const navigation = useNavigation();
  const [savedPosts, setSavedPosts] = useState([]);
  const [mySavedPostsIDs, setMySavedPostsIDs] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(true); //use this state to show a loading animation.

  const { userUID } = useContext(AppContext);

  //try refactoring this.
  useEffect(() => {
    //get the snapShot of his saved posts from his doc
    const subscriber = firestore()
      .collection('STUDENTS')
      .doc(userUID)
      .onSnapshot(documentSnapshot => {
        setMySavedPostsIDs(documentSnapshot.data()?.postsSaved);
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
            querySnapshot?.forEach(postSnapShot => {
              posts.push({
                item: {
                  ...postSnapShot?.data(),
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

    return () => { };
  }, [mySavedPostsIDs]);

  const _deletePost = (postID, deleteAction) => {
    hideSheet();
    confirmAction(postID, deleteAction);
  };

  if (isFetchingData) return <AppIndicator />;

  return (
    <View style={styles.container}>
      {savedPosts.length > 0 ? (
        <Feed useData={savedPosts} userUID={userUID} />
      ) : (
        <Retry
          notice="no saved post yet, or your mobile data is turned off"
          buttonText="try saving a post"
          handleRetry={() => navigation.navigate('home')}
        />
      )}
    </View>
  );
};

export default SavedPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neonBg,
    width: width,
    justifyContent: 'center',
  },
});
