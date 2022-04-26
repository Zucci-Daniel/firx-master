import {
  React,
  StyleSheet,
  View,
  Text,
  useState,
} from '../../../imports/all_RnComponents';

import {universalPadding, colors, width, height} from '../../../config/config';
import {useEffect, useContext} from 'react';
import {AppContext} from './../../../appContext';
import {SignUpInfoContext} from './../../forms/signUpInfoContext';
import firestore from '@react-native-firebase/firestore';

import AppFloatMenu from '../../../components/AppFloatMenu';
import Feed from './../../../components/Feed';
import FeedLoadingSkeleton from './../../../components/FeedLoadingSkeleton';
import {useCheckNetworkStatus} from './../../../hooks/justHooks';
import {
  useGetUserInformationFromFirestore,
  useGetUserBasicInformationFromLocalStorage,
} from './../../../hooks/useOperation';
import Skeleton from '../../../components/Skeleton';
import Finished from '../../../components/Finished';
import MiniLoading from '../../../components/MiniLoading';

const Home = ({navigation}) => {
  const {subscribeToNetworkStatus} = useCheckNetworkStatus();
  const online = subscribeToNetworkStatus();
  const [allPosts, setAllPost] = useState([]);
  const [blackLists, setBlackLists] = useState({
    myPostsBlackList: [],
    myProfilesBlackList: [],
  });
  const [postIsFinished, setPostIsFinished] = useState(false);
  const [shouldGetInformation, setShouldGetInformation] = useState(true);
  const [shouldGetPosts, setShouldGetPosts] = useState(true);
  const [doneFetchingBlackList, setDoneFetchingBlackList] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [itemsPerPage] = useState(10);
  const [lastPost, setLastPost] = useState(null);
  const {userUID} = useContext(AppContext);
  const {user, setUser} = useContext(SignUpInfoContext);

  // const baseUrl = firestore().collection('AllPosts');
  const baseUrl = firestore()
    .collectionGroup('AllPosts')
    .orderBy('postID', 'desc');
  // const postCondition = true
  //   ? baseUrl.where('postID', 'not-in', [
  //       'f92caa16-d975-4552-ac9c-0cd87cde0222',
  //       'ff5c1c0d-a0a2-497e-9252-673cc83784d7',
  //       'd4e6cff9-0ab5-41b0-8b2f-b95c3754ad06',
  //       'ba3f0376-e149-4b9b-90e6-7003949ad8fc',
  //     ])
  //   : baseUrl;
  const postCondition =
    blackLists.myPostsBlackList.length > 0
      ? baseUrl.where('postID', 'not-in', [
          'f92caa16-d975-4552-ac9c-0cd87cde0222',
          '88ae8ee6-4738-4da0-a0dc-e35933e6ac48',
        ])
      : baseUrl;

  const getBlackLists = () => {
    try {
      const subscriber = firestore()
        .collection('STUDENTS')
        .doc(userUID)
        .onSnapshot(documentSnapshot => {
          try {
            setBlackLists({
              ...blackLists,
              myPostsBlackList: documentSnapshot.data().postsBlackListed,
              myProfilesBlackList: documentSnapshot.data().profilesBlackListed,
            });
            console.log(
              documentSnapshot.data().profilesBlackListed,
              ' blacklisted profiles',
            );
            console.log(
              documentSnapshot.data().postsBlackListed,
              ' blacklisted posts',
            );
          } catch (error) {
            console.log(error.message);
          }
        });
      setDoneFetchingBlackList(true);
      return () => subscriber();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserInformation = async (id = userUID) => {
    if (online) {
      try {
        const response = await useGetUserInformationFromFirestore(id);
        if (response) return setUser(response);
      } catch (error) {
        console.log(
          "you're online but we failed to get your info from firstore, we're fetching your details locally",
          error.message,
        );
        const response = await useGetUserBasicInformationFromLocalStorage(id);
        if (response) return setUser(response);
      }
    } else {
      console.log('getting your basic info locally');
      const response = await useGetUserBasicInformationFromLocalStorage();
      if (response) return setUser(response);
    }
  };

  const storePosts = querySnapshot => {
    var queryDocuments = querySnapshot.docs;
    setLastPost(queryDocuments[queryDocuments.length - 1]);
    if (queryDocuments.length == 0 || queryDocuments.length < itemsPerPage) {
      console.log('POST DON FINISH!!');
      setPostIsFinished(true);
    } else {
      const posts = [];
      if (
        queryDocuments.length !== 0 ||
        queryDocuments.length >= itemsPerPage
      ) {
        querySnapshot.forEach(documentSnapshot => {
          if (
            blackLists.myProfilesBlackList
              ? blackLists.myProfilesBlackList.includes(
                  documentSnapshot.data().posterUserUID,
                ) == false
              : true
          ) {
            posts.push({
              item: {
                ...documentSnapshot.data(),
              },
              type: 'normal',
            });
          }
        });
        setAllPost(posts);
        // setAllPost([...allPosts, ...posts]);
        setIsFetchingData(false);
      } else {
        console.log(' NO MORE POSTS!!!');
      }
    }
  };

  const fetchPosts = async afterDoc => {
    let query = postCondition;
    let query2 = afterDoc ? query.startAfter(afterDoc) : query;

    const querySnapshot = await query2.limit(itemsPerPage).get();

    if (querySnapshot) {
      return storePosts(querySnapshot);
    } else console.log('not ready to set state');
  };

  useEffect(() => {
    getUserInformation();
  }, [online]);

  useEffect(() => {
    if (online && shouldGetInformation) {
      setShouldGetInformation(false); //i don't want it to run again afterwards
    }
  }, [online, user]);

  useEffect(() => {
    if (online) getBlackLists(); //store this too in local storage.
  }, [online]);

  useEffect(() => {
    if (online && shouldGetPosts && doneFetchingBlackList) {
      console.log('post blacklist now ', blackLists.myPostsBlackList);
      fetchPosts();
      setShouldGetPosts(false);
      console.log('fetching post.....');
    }
  }, [
    online,
    blackLists.myPostsBlackList,
    blackLists.myProfilesBlackList,
    user,
  ]);

  const handleLoadMoreData = async () => {
    if (postIsFinished === false) {
      await fetchPosts(lastPost);
      console.log('loading more from home');
    } else {
      console.log("cant fetch any more post, its's finished");
    }
  };

  if (isFetchingData) return <FeedLoadingSkeleton />;

  return (
    <>
      <View style={styles.container}>
        <Feed
          useData={allPosts}
          userUID={userUID}
          loadMoreData={handleLoadMoreData}
          loading={() =>
            postIsFinished == false ? <MiniLoading /> : <Finished />
          }
        />
      </View>
      <AppFloatMenu handlePost={() => navigation.navigate('camera')} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: undefined,
    width: width,
    backgroundColor: colors.neonBg,
    paddingBottom: universalPadding,
  },
  heading: {
    padding: universalPadding / 6,
    textAlign: 'center',
    fontSize: 14,
  },
});
