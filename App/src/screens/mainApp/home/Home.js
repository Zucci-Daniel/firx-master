import {
  React,
  StyleSheet,
  View,
  Text,
  useState,
} from '../../../imports/all_RnComponents';

import {universalPadding, colors, width} from '../../../config/config';
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


const Home = ({navigation}) => {
  const {subscribeToNetworkStatus} = useCheckNetworkStatus();
  const online = subscribeToNetworkStatus();

  const [allPosts, setAllPost] = useState([]);
  const [blackLists, setBlackLists] = useState({
    myPostsBlackList: [],
    myProfilesBlackList: [],
  });
  const [isFetchingData, setIsFetchingData] = useState(true);

  const {userUID} = useContext(AppContext);
  const {setUser} = useContext(SignUpInfoContext);

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
      const response = await useGetUserBasicInformationFromLocalStorage();
      if (response) return setUser(response);
    }
  };

  useEffect(() => {
    getUserInformation();
  }, []);

  useEffect(() => {
    if (online) getBlackLists();
  }, [online]);

  useEffect(() => {
    if (online) {
      const baseUrl = firestore().collection('AllPosts');
      const postCondition =
        blackLists.myPostsBlackList.length > 0
          ? baseUrl.where('postID', 'not-in', blackLists.myPostsBlackList)
          : baseUrl;

      //get the post.
      //refactor this.
      const subscriber = postCondition.onSnapshot(querySnapshot => {
        const posts = [];

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
          } else {
          }
        });

        setAllPost(posts);

        setIsFetchingData(false);
      });

      // Unsubscribe from events when no longer in use
      return () => subscriber();
    } else {
      console.log('mobile data is turned off');
    }
  }, [online]);


  if (isFetchingData) return <FeedLoadingSkeleton />;

  return (
    <>
      <View style={styles.container}>
        <Feed useData={allPosts} userUID={userUID} />
      </View>
      <AppFloatMenu handlePost={() => navigation.navigate('camera')} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: undefined,
    width: width,
    backgroundColor: colors.neonBg,
    justifyContent: 'center',
  },
  heading: {
    padding: universalPadding / 6,
    textAlign: 'center',
    fontSize: 14,
  },
});
