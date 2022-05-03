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

import AppFloatMenu from '../../../components/AppFloatMenu';
import Feed from './../../../components/Feed';
import FeedLoadingSkeleton from './../../../components/FeedLoadingSkeleton';
import {useCheckNetworkStatus} from './../../../hooks/justHooks';
import {
  useGetUserInformation,
  useGetBlackLists,
  fetchPostsFromServer,
} from './../../../hooks/useOperation';
import Finished from '../../../components/Finished';
import MiniLoading from '../../../components/MiniLoading';
import {HomeContext} from './homeContext';

const Home = ({navigation}) => {
  const {subscribeToNetworkStatus} = useCheckNetworkStatus();
  const online = subscribeToNetworkStatus();
  const [allPosts, setAllPost] = useState([]);
  const [shouldGetUserInfo, setShouldGetUserInfo] = useState(true);
  const [dontRunFromEffectAgain, setDontRunFromEffectAgain] = useState(false);
  const [showRetry, setShowRetry] = useState(false);

  const [isFetchingData, setIsFetchingData] = useState(true);
  const [postsBlackListed, setPostsBlackListed] = useState(null);
  const [profilesBlackListed, setProfilesBlackListed] = useState(null);
  const [fetchedBlacklists, setFetchedBlacklists] = useState(null);
  const [fetchedBasicInfo, setFetchedBasicInfo] = useState(null);
  const [postIsFinished, setPostIsFinished] = useState(false);
  const [itemsPerPage] = useState(10);
  const [lastPost, setLastPost] = useState(null);
  const {userUID} = useContext(AppContext);
  const {user, setUser} = useContext(SignUpInfoContext);
  const {posted} = useContext(HomeContext);

  const getInformation = async (userUID, online) => {
    setFetchedBasicInfo(false);
    const response = await useGetUserInformation(userUID, online);

    if (response) {
      console.log(response, ' info');

      setUser(response);
      setFetchedBasicInfo(true);
    }
  };

  const getBlackLists = async userUID => {
    setFetchedBlacklists(false);
    const response = await useGetBlackLists(userUID);
    if (response) {
      const {postsBlacklisted, profilesBlackListed} = response;
      setPostsBlackListed(postsBlacklisted);
      setProfilesBlackListed(profilesBlackListed);

      setFetchedBlacklists(true);
    }
  };

  const fetchPosts = async (
    blacklistPost,
    blackListProfiles,
    startAfterDoc,
    limit,
  ) => {
    const response = await fetchPostsFromServer(
      blacklistPost,
      blackListProfiles,
      startAfterDoc,
      limit,
    );
    if (response) {
      const {lastVisibleItem, posts} = response;
      if (posts.length == 0 || posts.length < itemsPerPage) {
        setLastPost(lastVisibleItem);
        setAllPost(posts);
        setIsFetchingData(false);
        setPostIsFinished(true);
      } else {
        setLastPost(lastVisibleItem);
        setAllPost(posts);
        setIsFetchingData(false);
      }
    }
  };

  useEffect(() => {
    if (shouldGetUserInfo) {
      console.log(' gonan get use info');
      //get the latest basic information
      getInformation(userUID, online);
      // setShouldGetUserInfo(false);
    }
  }, [online]);

  //get the blacklisted post
  useEffect(() => {
    getBlackLists(userUID);
  }, []);

  useEffect(() => {
    if (fetchedBlacklists && dontRunFromEffectAgain == false) {
      fetchPosts(postsBlackListed, profilesBlackListed, lastPost, itemsPerPage);
      setDontRunFromEffectAgain(true);
    }
  }, [fetchedBlacklists, dontRunFromEffectAgain]);

  const handleLoadMoreData = async () => {
    if (postIsFinished == false) {
      // return await fetchPosts(
      //   postsBlackListed,
      //   profilesBlackListed,
      //   lastPost,
      //   itemsPerPage,
      // );
    }
  };

  if (isFetchingData && !showRetry) return <FeedLoadingSkeleton />;

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
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: undefined,
    width: width,
    backgroundColor: colors.neonBg,
  },
  heading: {
    padding: universalPadding / 6,
    textAlign: 'center',
    fontSize: 14,
  },
});
