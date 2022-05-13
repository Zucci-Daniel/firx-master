import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, universalPadding, width} from '../../../../config/config';
import firestore from '@react-native-firebase/firestore';
import {AppContext} from './../../../../appContext';

import {commonFunctions} from '../../../../imports/all_files';

import Link from './../../../../components/Link';
import {useNavigation} from '@react-navigation/native';

import Feed from './../../../../components/Feed';
import AppIndicator from '../../../../components/AppIndicator';
import Retry from './../../../../components/Retry';
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

  if (isFetchingData) return <AppIndicator />;

  return (
    <View style={styles.container}>
      {authoredPosts.length > 0 ? (
        <>
          <Feed
            useData={authoredPosts}
            userUID={userUID}
            // loadMoreData={handleLoadMoreData}
            // loading={() =>
            //   postIsFinished == false ? <MiniLoading /> : <Finished />
            // }
          />
        </>
      ) : (
        <Retry
          notice="no recent post yet, create a post, or your mobile data is turned off"
          handleRetry={() => navigation.navigate('createPost')}
        />
      )}
    </View>
  );
};

export default AuthoredPosts;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.neonBg,
    width: width,
    justifyContent: 'center',
  },
});
