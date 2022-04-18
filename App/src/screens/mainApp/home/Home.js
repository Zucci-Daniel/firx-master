import {
  React,
  StyleSheet,
  View,
  Text,
  useState,
} from '../../../imports/all_RnComponents';

import {commonFunctions} from '../../../imports/all_files';
import {
  universalPadding,
  colors,
  width,
  height,
  postSize,
} from '../../../config/config';
import {useEffect, useContext} from 'react';
import {AppContext} from './../../../appContext';
import {useGetNewUser} from '../../../hooks/useOperation.js';
import {getFromLocalStorage} from '../../../hooks/useLocalStorageFunctions';
import {SignUpInfoContext} from './../../forms/signUpInfoContext';
import firestore from '@react-native-firebase/firestore';
import {storeLocally} from './../../../hooks/useLocalStorageFunctions';
import {log} from './../../../hooks/testLog';

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

  let check = subscribeToNetworkStatus();
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
    if (check) getBlackLists();
  }, [check]);

  useEffect(() => {
    if (check) {
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
              ...documentSnapshot.data(),
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
  }, [check]);

  if (isFetchingData) return <FeedLoadingSkeleton />;

  return (
    <>
      <View style={styles.container}>
        <Feed useData={allPosts} userUID={userUID} />
      </View>
      <AppFloatMenu onPressButton={name => navigation.navigate(name)} />
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
