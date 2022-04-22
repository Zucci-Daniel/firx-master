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
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [itemsPerPage] = useState(10);
  const [lastPost, setLastPost] = useState(null);
  const {userUID} = useContext(AppContext);
  const {setUser} = useContext(SignUpInfoContext);

  const baseUrl = firestore().collection('AllPosts');
  const postCondition =
    blackLists.myPostsBlackList.length > 0
      ? baseUrl.where('postID', 'not-in', blackLists.myPostsBlackList)
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
      console.log('==============================');
      console.log('POST DON FINISH!!');
      setPostIsFinished(true);
      console.log('==============================');
    }
    const posts = [];
    if (queryDocuments.length !== 0 || queryDocuments.length >= itemsPerPage) {
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
  };

  const fetchPosts = async afterDoc => {
    let query = postCondition.orderBy('postLikes', 'desc');
    let query2 = afterDoc ? query.startAfter(afterDoc) : query;

    const querySnapshot = await query2.limit(itemsPerPage).get();

    if (querySnapshot) {
      return storePosts(querySnapshot);
    } else console.log('not ready to set state');
  };

  useEffect(() => {
    if (online && shouldGetInformation) {
      console.log('getting information beacuse im online');
      getUserInformation();
      setShouldGetInformation(false); //i don't want it to run again afterwards
    }
  }, [online]);

  useEffect(() => {
    if (online) getBlackLists(); //store this too in local storage.
  }, []);

  useEffect(() => {
    if (online && shouldGetPosts) {
      fetchPosts();
      setShouldGetPosts(false);
      console.log('fetching post.....');
    }
  }, [online]);

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
