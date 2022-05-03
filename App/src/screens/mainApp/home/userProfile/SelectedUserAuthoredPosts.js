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
import { SelectedUserContext } from './selectedUserContext';
///use a flast list

const SelectedUserAuthoredPosts = () => {

    const {
        selectedUserDoc,
        setSelectedUserDoc,
        isFetching,
        setIsFetching,
        id,
        setId,
      } = useContext(SelectedUserContext);

  const navigation = useNavigation();
  const [authoredPosts, setAuthoredPosts] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true); //use this state to show a loading animation.

  const {userUID} = useContext(AppContext);

  useEffect(() => {
    try {
      firestore()
        .collection('AllPosts')
        .where('posterUserUID', '==', id)
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
        <Link
          text={'no recent post yet, create a post'}
          onPress={() => navigation.navigate('createPost')}
        />
      )}
    </View>
  );
};

export default SelectedUserAuthoredPosts;

const styles = StyleSheet.create({
  container: {
    height: undefined,
    backgroundColor: colors.neonBg,
    width: width,
  },
});
